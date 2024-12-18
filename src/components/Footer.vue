<template>
    <footer>
        <p>Gjord av Saga Einarsdotter Kikajon för Fullstack-utveckling med Ramverk på Mittuniversitetet 2024.</p>
        <p><a href="https://www.freevector.com/fisherman-catch-a-fish-concept-68000">Illustration</a></p>
    </footer>
</template>

<style scoped lang="scss">
@use "../assets/scss/vars" as v; 

footer {
    margin-top: 3em;
    text-align: center; 
    padding: 3em 1em;
    color: v.$orange;
}

a {
    text-decoration: 1px dotted underline; 
    color: v.$orange;

    &:hover {
        color: v.$yellow; 
    }
}

</style>