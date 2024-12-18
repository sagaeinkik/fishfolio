<template>
<!-- Om den laddar, visa loader -->
<div class="loading-content" v-if="isLoading === true">
        <div class="loader"></div>
        <div class="typewriter">
            <p>Hämtar innehåll...</p>
        </div>
</div>
<!-- Anrop gick fel -->
    <p v-else-if="errorMsg" class="message"> {{ errorMsg }}</p>
    <!-- Om det inte finns fisk -->
    <p v-else-if="fishes.length < 1 && isLoading === false" class="message">Det finns ingenting att visa. Lägg till en fångst!</p>
        <!-- Anrop gick bra, det finns fiskar att visa: loopa igenom -->
    <Catch @deleteFish="deleteFish(fish.id)" v-else v-for="fish in fishes" :fish="fish" :key="fish.id" :isDeleted="fish.id === deletedFishId"/>
</template>

<script setup>
import Catch from "./Catch.vue";
import { onMounted, ref } from "vue";

/* Variabler */
let url = "https://fishapi.up.railway.app/api/fish"; //API
/* REAKTIVA */
let fishes = ref([]); //Tom array till alla poster
let deletedFishId = ref(null); //används vid radering för att ändra till en loader i catch.vue
let isLoading = ref(true); //Håll koll på om anropet pågår (postgre på render = långsamt)
let errorMsg = ref(""); //Fel vid anrop?

/* METODER */

//Initiering
onMounted(() => {
    getAllFish();
})

//Get-anrop för alla fiskar
const getAllFish = async() => {
        try {
        const response = await fetch(url);
        const data = await response.json();
        fishes.value = data;
    } catch (error) {
        console.error("Det gick dåligt att hänta alla fiskar: " + error);
        errorMsg = "Något gick fel när data skulle hämtas. Försök igen senare eller kontakta Saga."; 
    } finally {
        //Slå om isloading till false oavsett anrop
        isLoading.value = false; 
    }
}

//Funktion för att radera fisk
const deleteFish = async(id) => {
    try {
        //Fråga om bekräftelse
        const confirm = window.confirm("Vill du verkligen radera denna rad?");
        if(confirm) {

            //Tilldela värde till deletedFishId så att ikonen kan ändras till en loader under tiden 
            deletedFishId.value = id; 

            const response = await fetch(url + "/" + id, {
                method: "DELETE", 
                headers: {
                "Accept": "application/json"
                }
            }); 

            const data = await response.json();

            //Uppdatera vy
            getAllFish();
        }
    } catch (error) {
        console.error("Något gick fel vid försök att radera data: " + error);
    }
}

// Exponera getAllFish så att parent kan använda den
defineExpose({
    getAllFish
})
</script>

<style scoped lang="scss">
@use "../assets/scss/vars" as v; 
//Loader!
.loading-content {
   width: fit-content; 
   margin: auto; 
   display: flex; 
   flex-direction: column; 
   align-items: center; 
   
   div.typewriter {
    text-align: center; 
    overflow: hidden; 
    border-right: .15em solid white; 
    white-space: nowrap; 
    margin: 0 auto; 
    letter-spacing: 1.5px; 
    animation: typing 2.2s steps(28, end), blink-caret .65s step-end infinite;
   }
}

.loader {
  border: 0.5em solid v.$orange; 
  border-top: 0.5em solid v.$darkblue;
  border-radius: 50%;
  width: 2em;
  height: 2em;
  animation: spin 1.4s linear infinite;
  margin: 2em 0 1em; 
}
/* KEYFRAMES  */

//Loader
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

//Skriv-effekt
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* cursor-effekt */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: v.$orange; }
}

//Meddelande
.message {
    margin-top: 1em; 
    text-align: center; 
}
</style>
