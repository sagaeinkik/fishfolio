<template>
    <div class="text-content">
        <h1>Om sidan</h1>
        <p>Det här är en single page application byggd med hjälp av Vue som ramverk. Den konsumerar min egen webbtjänst från föregående moment, ett Laravel-API som kommunicerar med en PostgreSQL-databas. Det här är min första bekantskap med Vue.</p>
        <p>jag valde att använda Composition API, för det påminde mig mer om en vanlig JS-fil vilket kändes aningens enklare för mig att greppa. (betoning på aningens)</p>
        <h2>Att arbeta med Vue som ramverk</h2>
        <p>Jag har ofta sett jämförelser mellan Vue och React, de nämns väldigt ofta i samma meningar, men eftersom jag har noll erfarenhet av React så tycker jag att Vue påminner om Angular. Komponenter, vyer, routing osv fungerar ganska liknande.</p>
        <p>Jag vet inte riktigt varför, men jag tycker att det är ganska kul att bygga SPA med komponenter. Det känns så snitsigt, på något vis. Att ha återanvändbara komponenter som man kan placera lite vart man vill har nån charm i mina ögon.</p>
        <p>Jag kan inte påstå att jag förstår ett dugg av det. Jag är generellt jätteförvirrad och vet inte alls vad jag håller på med; jag är på den nivån att jag kunde fumla mig genom att bygga sidan med videos och dokumentationen som hjälp, men jag skulle ju aldrig kunna räkna ut något på egen hand.</p>

        <h3>Saker jag gillade</h3>
        <ul>
            <li>Komponentspecifik CSS. Så smidigt att styla rakt i komponenten!</li>
            <li>Vue har stöd för SCSS! Vilken lycka! Jag la till det på en gång.</li>
            <li>Smidig routing! Jag gillar att man kan lägga till alias, redirects osv, hur enkelt som helst.</li>
            <li>Mycket funktionalitet inkluderad från start, behöver inte ladda ner så mycket tillägg.</li>
            <li>Väldigt enkelt att inkludera komponenter hit och dit. Bara att importera och lägga in, det var som inget krångel. Detta kanske inte är Vue-specifikt, jag gillar bara att det var enkelt.</li>
            <li>Jag gillar att man kan implementera logik med v-if/v-else osv rakt i HTML-taggen, även det påminner om Angular.</li>
            <li>Kort och clean syntax för att slänga på händelselyssnare rakt på HTML-taggn!</li>
            <li>Enkel syntax för emits också. Lätt att snappa upp emitsen från föräldra-komponenten och definiera den där.</li>
        </ul>
        <h3>Saker jag hade svårt med</h3>
        <ul>
            <li>I och med den komponentspecifika css:en hade jag lite svårt att hålla koll på reglerna och tappade bort mig lite (läs: mycket).</li>
            <li>Jag är lite för seg i kolan för att förstå när man ska använda :class, hur vue hanterar ref-objekt när de har returnerats som JSON-svar, när man ska använda .value osv.</li>
            <li>Med hjälp av Malins videor fick jag till logiken bakom event emitters och dylikt men jag skulle ljuga om jag påstod att jag förstår hur det funkar och skulle kunna hitta på det där helt själv. Själva syntaxen är enkel nog att förstå, men hur man ska dela upp det rent logiskt var svårt.</li>
            <li>Till och med att plocka ut värdena ur formuläret kändes lite knepigt.</li>
            <li>Även om jag gillar logik rakt i HTML-taggen fanns det vissa begränsningar som satte käppar i hjulet för mig. Om man till exempel vill kontrollera att det finns något att loopa igenom innan man gör det, går det inte att göra i samma tagg.</li>
            <li>I och med Vues egna kompilering/bundling kan error-meddelandena vara lite luddigare (detta upplever jag med Laravel också), samt svårare att använda Dev Tools för att kolla upp CSS.</li>
        </ul>
        <p>Jag är osäker om jag har tänkt rätt kring media queries. Nu har jag lagt dem rakt i komponenterna/vyerna de påverkar, vilket såklart leder till väldigt många brytpunkter. Jag vet inte om det hade varit bättre att lägga dem alla i main.css?</p>
        <h2>Avslutande tankar</h2>
        <p>Allt som allt tyckte jag att det var väldigt trevligt att sitta med Vue, och jag ser fram emot att göra det igen så jag kan få ännu bättre koll på hur saker och ting fungerar.</p>
    </div>
</template>

<style scoped lang="scss">
@use "../assets/scss/vars" as v; 

h3 {
    margin-top: 1.5em;
}

ul {
    margin-left: 1em;

    li {
        margin: 0.3em 0; 
    }
}
</style>