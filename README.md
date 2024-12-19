# Fishfolio

av Saga Einarsdotter Kikajon (sa2301) för kursen Fullstacks-utveckling med Ramverk på Mittuniversitetet 2024.

## Bakgrund

I tidigare moment skapade jag ett Rest-API med Laravel som ramverk. Efter extremt mycket om och men lyckades jag publicera det till Railway.  
API:et handlar om fiskar och används för att registrera fångster.

I detta moment skulle vi skapa en SPA med hjälp av Vue, som konsumerar API:et från föregående moment.

## Bra att veta

API:et är kopplat till en PostgreSQL-databas som ligger på Render (gratis). API:et i sig är publicerat på Railway (gratis). Detta medför att API:et är väldigt långsamt. Att hämta, lägga till och uppdatera fungerar, men det tar flera sekunder – jag vet inte om detta beror på mig eller om det är för att jag använder gratisversionerna av plattformernas tjänster. Jag har försökt lägga till så många indikationer som möjligt på att webbtjänsten arbetar, men det finns ett litet glapp mellan att en loader slutar snurra och att vyn uppdateras. Jag beklagar detta.

Jag valde också att använda Composition API för att det på något vis kändes lite mer välbekant, mer som en vanlig js-fil än att arbeta rakt på objektet.

### Kraven

Enligt uppgiftsbeskrivningen ska props, emits, reaktiv-data och two way-binding användas. För att bespara er mödan med att gräva runt i alla mina komponenter:

-   Props har jag använt i `components/Catch.vue` för att ta emot och definiera fish som ett objekt när det skickas från `components/CatchListing.vue`.
-   Emits använder jag från `components/Catch.vue` till `components/CatchListing.vue` i form av en händelsehanterare (click) som anropar en funktion i Catchlisting som gör ett DELETE-anrop till API:et och uppdaterar listan.
-   Reaktiv data använder jag faktiskt lite här och där, bland annat i `components/CatchView.vue` för att visa/dölja formuläret.
-   Two way-binding använder jag i `components/AddCatch.vue` för att visa användaren hur många texten hen har kvar att skriva i kommentarsfältet. Det används också i formuläret i samma fil, men inte för att uppdatera vyn.
