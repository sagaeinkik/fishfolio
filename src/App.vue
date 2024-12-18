<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Banner from "./components/Banner.vue";
import Footer from "./components/Footer.vue"; 

</script>

<template>
    <Banner />
    <main>
        <RouterView />
    </main>
    <Footer/>
</template>

<style scoped>
main {
    width: 60%; 
    margin: auto; 
    padding: 1em;
}
</style>