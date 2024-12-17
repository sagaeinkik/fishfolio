<template>
    <header>
        <div class="hero-area">
            <div class="text-area">
                <p class="spa-name">Fishfolio</p>
                <p>Fiskeloggen för dig som vill dokumentera dina bästa fiskedagar. Snabbt, smidigt, samlat på ett och samma ställe.</p>
            </div>
            <img src="../assets/images/fisherman.png" alt="Illustration av fiskare som håller upp en fisk">
        </div>
    </header>
    <Navbar />
</template>

<script setup>
import Navbar from "./Navbar.vue";
</script>

<style scoped lang="scss">
@use "../assets/scss/vars" as v;
header {
    background: linear-gradient(v.$pinkred, v.$darkblue);
}

.hero-area {
    width: 80%; 
    margin: auto; 
    padding: 2em 1em 1em;
    display: grid; 
    grid-template-columns: 1fr 1fr;
    gap: 2em;
}

.text-area {
    justify-self: center;
    align-self: center;


    .spa-name {
        font-size: 5em;
        font-family: v.$herofont;
        letter-spacing: 1.5px; 
    }
    p {
        max-width: 33em;
    }
}

img {
    width: 70%;
    justify-self: center;
}
</style>