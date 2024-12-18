<template>
    <h1>Fångster</h1>
    <button @click="toggleForm">
        <!-- Olika knapp-innehåll baserat på om formuläret syns eller ej -->
        <template v-if="!showForm">
            <i class="fa-solid fa-plus"></i> Registrera fångst
        </template>
        <template v-else>
            &mdash; Dölj formulär
        </template>
    </button>
    <AddCatch v-if="showForm" @fishAdded="handleAddedFish"/>
    <CatchListing ref="catchListingRef" />
</template>

<script setup>
import CatchListing from "../components/CatchListing.vue";
import AddCatch from "../components/AddCatch.vue";
import { ref } from "vue";

//Ska formulär visas? 
const showForm = ref(false);
//Har en fisk lagts till?
const catchListingRef = ref(null);

//Funktion för att visa/dölja formulär
const toggleForm = () => {
    showForm.value = !showForm.value; 
}

//Funktion för att uppdatera vyn baserat på emit från AddCatch
const handleAddedFish= () => {
    catchListingRef.value.getAllFish();
}
</script>

<style scoped lang="scss">
@use "../assets/scss/vars" as v; 

button {
/*     background-color: #192432; 
    color: v.$orange; */
    background-color: v.$orange;
    color: white;
    margin: 2em 0;  

    &:hover {
        background-color: v.$pinkred;
    }
}
</style>