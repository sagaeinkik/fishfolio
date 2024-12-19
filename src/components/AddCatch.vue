<template>
    <form @submit.prevent="handleSubmit">
        <h3>Registrera ny fångst</h3>
        <ul v-if="backendErrors.length > 0" class="error">
                <li v-for="(error, index) in backendErrors" :key="index"> {{ error }} </li>
        </ul>
        <ul v-if="frontendErrors.length > 0" class="error">
                <li v-for="(error, index) in frontendErrors" :key="index"> {{ error }} </li>
        </ul>

        <!-- ART -->
        <div class="form-ctrl">
        <label for="species">Art: <span class="req">*</span></label>
        <input type="text" name="species" id="species" v-model="form.species" required>
        </div>

        <!-- LÄNGD -->
        <div class="form-ctrl">
            <label for="lengthInCm">Längd i cm:</label>
            <!-- Tooltip -->
            <span class="tooltip">
                <i class="fa-regular fa-circle-question"></i>
                <span class="tooltip-text">Max 8 tecken, 3 decimaler.</span>
            </span>
            <input type="number" name="lengthInCm" id="lengthInCm" v-model.number="form.lengthInCm">
        </div>

        <!-- VIKT -->
        <div class="form-ctrl">
            <label for="weightInGrams">Vikt i gram:</label>
             <!-- Tooltip -->
            <span class="tooltip">
                <i class="fa-regular fa-circle-question"></i>
                <span class="tooltip-text">Endast heltal accepteras</span>
            </span>
            <input type="number" name="weightInGrams" id="weightInGrams" v-model.number="form.weightInGrams">
        </div>

        <!-- TILLBAKASLÄPPT -->
        <div class="form-ctrl">
            <label for="released">Tillbakasläppt?</label>
            <input type="checkbox" name="released" id="released" v-model="form.released">
        </div>

        <!-- FÅNGAD MED -->
        <div class="form-ctrl">
            <label for="caughtWith">Fångad med: <span class="req">*</span></label>
            <!-- Tooltip -->
            <span class="tooltip">
                <i class="fa-regular fa-circle-question"></i>
                <span class="tooltip-text">Redskap (t ex haspelspö), metod (t ex trolling) och/eller bete (t ex skeddrag). Upp till 64 tecken.</span>
            </span>
            <input type="text" name="caughtWith" id="caughtWith" v-model="form.caughtWith" required>
        </div>

        <!-- KOMMENTAR -->
        <div class="form-ctrl">
            <div class="form-flex">
            <label for="comment">Kommentarer?</label>
            <span :class="{ 'exceeded' : commentLength < 0 }">{{ commentLength }}</span>
            </div>
            <textarea v-model="form.comment" name="comment" id="comment"></textarea>
        </div>

        <!-- SKICKA IN -->
        <button>
            <template v-if="!addInProgress">
                    Lägg till
                </template>
                <template v-else>
                    <div class="loader"></div>Lägger till...
                </template>
        </button>
    </form>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"; 

//Emit 
const emit = defineEmits(['fishAdded']);

/* REAKTIV */
//Formulär
const form = ref({
    species: '', 
    lengthInCm: null,
    weightInGrams: null,
    released: false,
    caughtWith: '', 
    comment: ''
})
//Kommentarvärde
const comment = ref(form.comment);
//felmeddelanden
let backendErrors = ref([]); 
let frontendErrors = ref([]); 
let addInProgress = ref(false);

//Räkna längden på comment-strängen
const commentLength = computed(() => {
    return 500 - (form.value.comment?.length);
})


/* ---FUNKTIONER---- */

//Validering av input: 
const validateInput = () => {
    //Se till att tömma felmeddelanden
    frontendErrors.value = []

    //Hämta fältvärdena
    const { species, lengthInCm, weightInGrams, released, caughtWith, comment } = form.value;

    //Kontroller
    if(!species || species.trim().length === 0) {
        frontendErrors.value.push("Du måste fylla i art.");
    }

    if(lengthInCm !== null && lengthInCm < 0) {
        frontendErrors.value.push("Längden kan ej vara negativ.");
    }

    if(weightInGrams !== null && weightInGrams < 0) {
        frontendErrors.value.push("Vikten kan ej vara negativ.");
    }

    if(!caughtWith || caughtWith.trim().length === 0) {
        frontendErrors.value.push("Du måste ange hur du fångade fisken."); 
    }

    if(comment && comment.length > 500) {
        frontendErrors.value.push("Din kommentar får inte vara mer än 500 tecken."); 
    }

    //Returnera bool baserat på om det finns error
    return frontendErrors.value.length === 0;
}


/* FORMULÄRHANTERING */
const formReset = () => {
    form.value = {
        species: '', 
        lengthInCm: null,
        weightInGrams: null,
        released: false,
        caughtWith: '', 
        comment: ''
    };
    backendErrors.value = [];
    frontendErrors.value = [];
}

//Submit
const handleSubmit = async() => {
    addInProgress.value = true; 
    //Validera
    if(!validateInput()) {
        //Slå av loadern
        addInProgress.value = false; 
        //Avbryt allt
        return; 
    }

    //Skapa ny fisk
    let newFish = {
        species: form.value.species, 
        released: form.value.released, 
        caughtWith: form.value.caughtWith, 
    }

    if(form.value.lengthInCm) {
        newFish.lengthInCm = form.value.lengthInCm;
    }
    if(form.value.weightInGrams) {
        newFish.weightInGrams = form.value.weightInGrams;
    }
    if(form.value.comment) {
        newFish.comment = form.value.comment;
    }

    //Anropa POST-funktion med nya fisken
    let success = await postFish(newFish);


    //Om PostFish returnerar true, nollställ formulär och gör emit till förälder för att uppdatera vyn
    if(success) {
        formReset();
        emit("fishAdded");
    }
}

//API-ANROP
const postFish = async(fish) => {
    try {
        const response = await fetch("https://fishapi.up.railway.app/api/fish", {
            method: "POST", 
            headers: {
                "Accept": "application/json", 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fish)
        });
        const data = await response.json();

        //Något gick dåligt:
        if(!response.ok) {
            //Kolla 422 dvs felaktig inmatning
            if(response.status === 422) {
                backendErrors.value = Object.values(data.errors).flat(); 
                return false; 
            } else {
                throw new Error("HTTP error, status " + response.status);
            }
        }
        return true; 
    } catch (error) {
        backendErrors.value = ["Något gick fel vid anropet: " + error.message];
        console.error("Fel vid post-anrop:" + error);
        return false; 
    } finally {
        //Slå om loader-switchen
        addInProgress.value = false;
    }
}
</script>

<style scoped lang="scss">
@use "../assets/scss/vars" as v; 

/* TOOLTIP */
.tooltip {
    position: relative; 
    left: 4em;
    color: v.$yellow;

    .tooltip-text {
        position: absolute; 
        width: 15em;
        background-color: white; 
        color: v.$darkblue;
        padding: 0.5em;
        border: 2px solid v.$yellow;
        border-radius: 7px 5px 5px 0; 
        bottom: 1em;
        visibility: hidden;
    }

    &:hover {

        .tooltip-text {
            visibility: visible;
        }
    }
}

/* FORMULÄR */
form {
    width: 70%; 
    margin: 3em auto; 

    //felmeddelande
    .error {
        color: v.$pinkred; 
        margin-top: 1em; 
        background-color: #1c2c41;
        padding: 0.5em;
        border-radius: 10px; 
    }

    ul li {
        list-style: none;
    }
}

.form-ctrl {
    margin: 1.5em 0; 

    //Required-stjärnan
    span.req {
        color: v.$pinkred; 
    }

    label {
        margin-left: 1em;
    }

    input[type="text"], input[type="number"], textarea {
        width: 100%; 
        display: block;
        font-family: v.$textfont;
        font-size: 1em;
        padding: 0.5em 1em;
        margin-top: 0.4em;
        border: none;
        border-bottom: 1px solid v.$yellow; 
        background-color: v.$darkblue; 
        color: white;

        &:focus {
            border-radius: 10px; 
            outline: 1px solid v.$yellow;
            border-bottom: none;
            background-color: #1c2c41;
        }
    }

    input[type="checkbox"] {
        accent-color: v.$yellow;
        margin: 2em 0 2em 1em;
        height: 1.3em; 
        width: 1.3em; 
    }

    //Flytta textareans räknare
    .form-flex {
        display: flex; 
        justify-content: space-between;

        span {
            color: v.$orange;
            font-size: 0.8em;
        }

        span.exceeded {
            color: v.$pinkred;
        }
    }
}

//submit
button {
    background-color: v.$yellow;
    color: v.$darkblue;

    //LOADER
    .loader {
        display: inline-block;
        border: 0.4em solid v.$darkblue; 
        border-top: 0.3em solid v.$yellow;
        width: 1.2em;
        height: 1.2em;
        margin-right: 0.8em;
    }

    &:hover {
        background-color: v.$pinkred;
        color: white;

        .loader {
            border-top: 0.3em solid v.$pinkred;
        }
    }
}

/* MEDIA QUERIES */
@media (max-width: 1300px) {
    form {
        width: 80%; 
    }
}

@media (max-width: 520px) {
    form {
        width: 100%;
    }
}
</style>