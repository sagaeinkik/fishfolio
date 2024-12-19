<template>
    <article>
        <h3>{{ upperCaseSpecies }}</h3>
        <div class="flex-cntnr">
            <div class="info">

        <p v-if="fish.lengthInCm"><span>Längd:</span> {{ fish.lengthInCm }} cm</p>
        <p v-if="fish.weightInGrams"><span>Vikt:</span> {{ fish.weightInGrams }}g</p>
        <p><span>Tillbakasläppt:</span> {{ fish.released ? "Ja" : "Nej"}}</p>
        <p><span>Fångad med:</span> {{ fish.caughtWith}}</p>
        <p v-if="fish.comment"><span>Kommentar:</span>  {{ fish.comment }}</p>
        <p><span>Fångad:</span> {{ formattedDate }}</p>
            </div> <!-- slut på info -->

            <!-- Radera-ikon eller loader beroende på om man tryckt eller inte -->
            <a class="delete" @click="$emit('deleteFish')">
                <template v-if="!isDeleted">
                    <i class="fa-regular fa-trash-can"></i>
                </template>
                <template v-else>
                    <div class="loader"></div>
                </template>
            </a>
        </div> <!-- slut på flex-cntnr -->
    </article>
</template>

<script setup>
import { defineProps, computed } from "vue"; 

//Hämta properties från CatchListing
const { fish, isDeleted }= defineProps({
    fish: Object, 
    isDeleted: {
        type: Boolean, 
        default: false
    }
}); 


//Se till att species alltid har stor bokstav
const upperCaseSpecies = computed(() => {
    let species = fish.species;
    species = species.charAt(0).toUpperCase() + species.slice(1); 
    
    return species; 
})

//Formattera om datumet
const formattedDate = computed(() => {
    let rawDate = new Date(fish.created_at);
    let year = rawDate.getFullYear(); 
    let month = rawDate.toLocaleString("sv-SE", { month : "long"});
    let day = rawDate.getDate(); 

    return `${day} ${month} ${year}`
})
</script>


<style scoped lang="scss">
@use "../assets/scss/vars" as v; 

article {
    border-bottom: 1px solid white;
    margin: 2em 0 0;
    padding-bottom: 1em;

    p {
        max-width: 50em;
    }

    span {
        margin-right: 0.5em;
        color: v.$orange;
    }
}

//Flex
.flex-cntnr {
    display: flex; 
    gap: 1em;
    justify-content: space-between;

    a {
        height: fit-content;
        align-self: center; 
        background-color: white;
        color: v.$pinkred; 
        padding: 0.8em 1em;
        border-radius: 50%;
        cursor: pointer;

        i {
            font-size: 1.1em;
        }

        &:hover {
            background-color: v.$pinkred;
            color: white;
        }
    }
}

//LOADER
.loader {
  border: 0.3em solid v.$orange; 
  border-top: 0.3em solid v.$darkblue;
  width: 1em;
  height: 1em;
  margin: 0.2em 0; 
}

</style>