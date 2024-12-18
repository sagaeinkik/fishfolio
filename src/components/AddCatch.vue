<template>
    <form @submit.prevent="handleSubmit">
        <h3>Registrera ny fångst</h3>
        <ul v-if="errorArray.length > 0" class="error">
                <li v-for="(error, index) in errorArray" :key="index"> {{ error }} </li>
        </ul>
        <p v-if="errMsg" class="error">{{ errMsg }}</p>

        <!-- ART -->
        <div class="form-ctrl">
        <label for="species">Art: <span class="req">*</span></label>
        <input type="text" name="species" id="species" v-model="form.species">
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
            <input type="text" name="caughtWith" id="caughtWith" v-model="form.caughtWith">
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
        <input type="submit" value="Lägg till">
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
let errorArray = ref([]); //Från backend
let errMsg = ref("");

//Räkna längden på comment-strängen
const commentLength = computed(() => {
    return 500 - (form.value.comment?.length);
})

//Validering av input: 


//Submit
const handleSubmit = async() => {
    //Nytt objekt
    let newFish = {
        species: form.value.species, 
        lengthInCm: form.value.lengthInCm, 
        weightInGrams: form.value.weightInGrams, 
        released: form.value.released, 
        caughtWith: form.value.caughtWith, 
        comment: form.value.comment
    }

    console.log(newFish);
    try {
        const response = await fetch("https://fishapi.up.railway.app/api/fish", {
            method: "POST", 
            headers: {
                "Accept": "application/json", 
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(newFish)
        })

        const data = await response.json(); 
        if (!response.ok) {
           
           //Kolla om det är 422 (felaktigt ifyllda fält)
            if (response.status === 422) {
                 // Formatera och spara felmeddelandena
                errorArray.value = Object.values(data.errors).flat();
                console.log(errorArray.value);
            } else {

                //Annars är det något annat fel; ge error
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } else {

            //Nollställ formuläret
            form.value = {
                species: '', 
                lengthInCm: null,
                weightInGrams: null,
                released: false,
                caughtWith: '', 
                comment: ''
            };

            //Uppdatera vyn: 
            //Emit till CatchView som sen skickar ner till CatchListing
            emit("fishAdded"); 
        }
    } catch (error) {
        errMsg.value = error;
        console.log("Det gick inte att lägga till objekt: " + error); 
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
</style>