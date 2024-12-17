<template>
    <nav>
        <ul>
            <li>
                <RouterLink to="/" :class="[isActive('/') ? 'current' : 'normal']"><img src="../assets/images/fishingrod.svg" alt="Ikon av ett fiskespö"><span>Att fiska</span></RouterLink>
                <RouterLink to="/catches" :class="[isActive('/catches') ? 'current' : 'normal']"><img src="../assets/images/fish2.svg" alt="Ikon av fisk med krok"><span>Fångster</span></RouterLink>
                <RouterLink to="/about" :class="[isActive('/about') ? 'current' : 'normal']"><img src="../assets/images/map.svg" alt="Ikon av karta"><span>Om sidan</span></RouterLink>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { RouterLink, useRoute } from "vue-router";

//Funktion för aktiv undersida
const isActive = (routePath) => {
    //Hitta nuvarande
    const route = useRoute(); 
    //Returnera om det är samma som argument
    return route.path === routePath; 
}
</script>

<style scoped lang="scss">
@use "../assets/scss/vars" as v; 

nav {
    width: 80%; 
    margin: 4em auto;
    background-color: white;
    padding: 1em;
    border-radius: 50px;

    li {
        width: 80%;
        margin: auto;
        display: flex; 
        justify-content: space-between;
        list-style: none;
        font-size: 1.3em;
    }

    a {

        color: v.$darkblue; 
        display: flex; 
        align-items: center; 
        @include v.transition; 
        img {
            width: 1.7em;
            margin-right: 0.5em;
        }

        
        &:hover, &.current {
            color: v.$pinkred;

            img {
                filter: invert(29%) sepia(97%) saturate(986%) hue-rotate(326deg) brightness(119%) contrast(84%);
            }
        }
    }
    //Gör mittersta ikonen lite större
    a:nth-child(2) {
        img {
            width: 1.9em;
        }
    }
}
</style>