<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Banner from "./components/Banner.vue";

</script>

<template>
    <Banner />
    <main>
        <RouterView />
    </main>
</template>

<style scoped>
main {
    width: 60%; 
    margin: auto; 
    border: 1px solid white; 
    padding: 1em;
}
</style>