<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="text-content">
    <h1>Att fiska</h1>
    <p>Fiske är något som människan har sysselsatt sig med i många, många år. Minst 40'000 år, faktiskt &mdash; vissa källor drar till med 70'000. Det finns nästan lika många sätt att fiska på som det finns fiskar i Storsjön, och ännu fler redskap och tillbehör att använda sig av. </p>
    <p>Ska du fiska med nät, utterlina, pimpelspö, harpungevär, det (ö)kända Nobeldraget (detta räknas som fusk) eller kanske metspö? Ska du fiska med haspelspö, och i så fall, vad ska du ha för drag: en wobbler, ett skeddrag, en spinnare, kanske en jigg? Om du ska pimpla, vill du då ha mask, maggot eller mjölmmask på kroken; om du väljer maggot, vill du då ha vita eller blandade?</p>
    <p>Det är lätt att bli överväldigad i denna enorma djungel av nya ord och produkter. Men frukta icke! På Fishfolio kan du se vad andra har använt sig av för metoder och redskap för att <RouterLink to="/catches">dra upp fångsten</RouterLink>.</p>
    <p>Forntida människan fiskade med lite hästtagel eller senor som lina och krokar gjorda på snäckskal. Du kommer att klara dig fint. </p>
    <p>Och glöm inte: fiskare är ett vidskepligt folk. Man önskar <em>aldrig</em> en fiskare lycka till. För att inte jinxa deras fiskelycka önskar vi dem istället skitfiske.</p>

    <h2>Varför fiske?</h2>
    <p>Fiske är en fantastisk hobby att ha eftersom det är en av få sporter som involverar minimalt med rörelse.</p>
    <p>Du själv kan naturligtvis sätta din egen nivå. Den som vill göra det lite jobbigt för sig kan man ro runt och trolla. Vill man göra så lite som möjligt pimplar man vid ett enda hål i isen. Vill man ha det lite lagom kan man flugfiska, vilket kan vara teknikkrävande och tålamodsprövande. </p>
    <p>Det slutar aldrig att vara spännande att känna det där rycket i spöet, och adrenalinet gör inte skillnad på en stor eller liten fisk. </p>
    <p> Men det handlar faktiskt inte alltid om att få fisk. Det handlar lika mycket om att få komma ut i naturen, att komma nära den, och att omges av ett lugn som är svårt att hitta annars. Man slipper vara på väg någonstans. Man kan kosta på sig att bara vara.</p>
    <p>Som en extra bonus finns det faktiskt ingen fisk som smakar bättre än den man har dragit upp själv.</p>
  </div> <!-- Slut på text-content -->
</template>

<style scoped lang="scss">
@use "../assets/scss/vars" as v;
a {
    text-decoration: 1px dotted underline; 
    @include v.transition; 

    &:hover {
        color: v.$pinkred;
    }
}

p {
    margin-bottom: 1em;
}
</style>