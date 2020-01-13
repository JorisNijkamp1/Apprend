# Software Guidebook Apprend

**Team**
 - Jesse Koerhuis
 - Niels Bogers
 -  Joris Nijkamp
 - Gino Verwijs
 - Aaron van den Berg


## Inleiding

 1. Context
 2. Functional Overview
 3. Quality Attributes
 4. Constraints
 5. Principles
 6. Software Architecture
 7. Infrastructure Architecture
 8. Deployment
 9. Operation and Support


## Context
Apprend is een nieuwe webapplicatie, gebouwd met het React framework en ondersteund door een NodeJS server, waarbij gebruikers door middel van flashcards hun geheugen kunnen trainen. Het is bedoeld voor bijvoorbeeld leerlingen van de HAN, maar ook oudere mensen zouden hun geheugen kunnen trainen met behulp van deze applicatie.

De applicatie is ontwikkeld om te concurreren met soortgelijke applicaties zoals Quizlet, Anki en Duolingo. 

Gebruikers kunnen decks aanmaken waar verschillende flashcards aan toegevoegd kunnen worden. De gebruiker kan deze decks vervolgens spelen. Het geheugen van de gebruiker wordt getraind doordat het systeem slim flashcards selecteert aan de hand van het [Leitner Systeem](https://en.wikipedia.org/wiki/Leitner_system) en [Spaced Repitition](https://en.wikipedia.org/wiki/Spaced_repetition).

Gebruikers kunnen ook registreren (en inloggen) om daarmee hun aangemaakte decks te behouden. Deze decks zullen anders verloren gaan wanneer de cookies van de browser worden verwijderd. Het voordeel van registreren is dat de gebruiker zijn decks op verschillende apparaten kan gebruiken.

![Apprend context diagram](https://github.com/HANICA-DWA/sep2019-project-kiwi/blob/development/Documentatie/C4%20model%20-%20System%20Context.svg)



## Functional Overview
De onderstaande functionaliteiten beschrijven wat de gebruiker kan doen met het systeem. Zie ook het [Product Backlog](https://github.com/HANICA-DWA/sep2019-project-kiwi/projects/2?fullscreen=true&card_filter_query=label%3A%22user+story%22) voor een lijst met alle user-stories.

- **Decks aanmaken**
[Wireframe](https://github.com/HANICA-DWA/sep2019-project-kiwi/blob/development/Documentatie/Wireframes/create-deck.svg)
	> Wanneer een gebruiker **zonder** account een deck aanmaakt, worden zijn gegevens als anoniem in de database opgeslagen onder een sessie-ID. Deze wordt ook als cookie in de browser opgeslagen zodat de browser de anonieme gegevens kan ophalen.
	De volgende invoervelden zijn aanwezig:
    - De gebruiker kan een naam opgeven.
    - De gebruiker kan een beschrijving opgeven.
    - De gebruiker kan tags toevoegen aan zijn deck.
    - De gebruiker kan het deck public of private maken, standaard instelling is public.
    - De gebruiker kan kiezen welke typen kolommen er in mogen komen.

- **Deck spelen**
[Wireframe](https://github.com/HANICA-DWA/sep2019-project-kiwi/blob/development/Documentatie/Wireframes/Deck-playing.svg)
	> De gebruiker krijgt een selectie van kaarten die op willekeurige volgorde gepresenteerd worden. Dit is gebaseerd op het [Leitner Systeem](https://en.wikipedia.org/wiki/Leitner_system) (Zie hoofdstuk 7: Infrastructure Architecture).
	De gebruiker kan:
    - Een flashcard omdraaien om het antwoord of de definitie te tonen;
    - Een flashcard nogmaals omdraaien om de vraag of de term weer in te zien;
    - Aangeven of hij/zij de flashcard goed had;
    - Aangeven of hij/zij de flashcard fout had;
    - Het spel beëindigen;
    - Een scoreboard inzien wanneer het spelen voorbij is;
    - De gebruiker kan vooraf kiezen welke kolommen op de voor- en achterzijde getoond zullen worden;
    - De gebruiker kan audiokolommen afspelen;

- **Decks bewerken**
[Wireframe](https://github.com/HANICA-DWA/sep2019-project-kiwi/blob/development/Documentatie/Wireframes/edit-deck.svg) [Wireframes](https://github.com/HANICA-DWA/sep2019-project-kiwi/blob/development/Documentatie/Wireframes/wireframes%20flashcards%20table.svg)

	> Wanneer een gebruiker een overzicht van decks bekijkt waarvan hij de eigenaar/maker is, dan ziet de gebruiker een icon met een papier en pen. De gebruiker kan op deze icon drukken om dat specifieke deck te kunnen aanpassen. De gebruiker kan de wijzigingen opslaan door op het bevestigknopje te drukken of annuleren door nogmaals op hetzelfde icoontje of het annuleerknopje te drukken. De bevestiging- en annuleerknoppen worden zichtbaar nadat de gebruiker kiest om een deck aan te willen passen.\
	\
	Een gebruiker kan zijn deck wijzigen op de pagina met al zijn decks, maar ook op de pagina van een deck zelf. Wanneer de gebruiker een deck aan het aanpassen is, dan zullen deze wijzigingen opgeslagen worden in de state van het component. Als de gebruiker zijn wijziging opslaat, dan wordt de wijziging-state opgestuurd naar de server. Als de gebruiker besluit om de wijzigingen te annuleren, dan wordt de wijziging-state gereset.\
	\
	De volgende invoervelden zijn aanwezig op de pagina met alle decks:\
		- De gebruiker kan een naam aanpassen.\
		- De gebruiker kan een beschrijving aanpassen.
	\
	De volgende invoervelden zijn aanwezig op de pagina van het deck zelf:\
		- De gebruiker kan een naam aanpassen.\
		- De gebruiker kan een beschrijving aanpassen.
		- De gebruiker kan tags toevoegen en verwijderen.
		- De gebruiker kan tekst, audio of afbeelding kolommen toevoegen of weghalen.
		- De gebruiker kan een kolom een naam geven.

- **Decks verwijderen**
	> Wanneer een gebruiker een overzicht van decks bekijkt waarvan hij de eigenaar/maker is, dan ziet de gebruiker een vuilnisbak-icon. De gebruiker kan op deze icon drukken om dat specifieke deck te verwijderen. Wanneer de gebruiker op deze knop drukt wordt in de state van het component opgeslagen dat deze deck verwijderd dient te worden. De gebruiker dient vervolgens op de bevestigingsknop te drukken om het deck te verwijderen of kan het annuleren door nogmaals op de vuilnisbak-icon te klikken, op de annuleerknop of simpelweg niets te doen. Een deck verwijderen kan ook op de pagina van het deck zelf.
	> De gebruiker krijgt een bevestigingsmelding.
	
- **Flashcards filteren**
	> De gebruiker kan op de pagina van het deck filteren tussen alle flashcards d.m.v een zoek balk.
	> De gebruiker kan alleen filteren op text-type kolommen.

- **Flashcards bewerken**
[Wireframe](https://github.com/HANICA-DWA/sep2019-project-kiwi/blob/development/Documentatie/Wireframes/Flashcard-create-modify.svg)
	>	De volgende invoervelden zijn aanwezig:
    - De gebruiker kan een flashcard toevoegen met content dat past bij de gekozen type kolommen van het deck
    - De gebruiker kan een stuk tekst toevoegen bij tekstkolommen.
    - De gebruiker kan een afbeelding uploaden (van maximaal dan 10mb) of een link opgeven bij afbeeldingkolommen.
    - De gebruiker kan een audiobestand uploaden (van maximaal dan 10mb) bij audiokolommen.

- **Flashcards uit een deck verwijderen**
[Wireframe](https://github.com/HANICA-DWA/sep2019-project-kiwi/blob/development/Documentatie/Wireframes/Flashcard-create-modify.svg)
	> De gebruiker kan een oneindig aantal flashcards toevoegen.<br />
	<br />
	De volgende invoervelden zijn aanwezig:
    - De gebruiker krijgt een bevestigingsmelding.

- **Importeren van een deck**
	> Als gast of (anonieme) gebruiker wil ik decks kunnen importeren van een andere Apprend gebruiker, zodat ik iets kan oefenen zonder dat ik daarvoor een deck aan moet maken. De gebruiker kan zien hoe vaak het deck al geïmporteerd is, en kan op een knop klikken om het deck te importeren. Er wordt een kopie gemaakt en de gebruiker wordt doorgestuurd naar het nieuwe geïmporteerde deck. De gebruiker kan daarnaast ook met een knop terug naar het originele deck.
    
- **Decks afschermen voor andere gebruikers**
	> Als gast of (anonieme) gebruiker wil ik decks private kunnen maken.
	De gebruiker kan:
    - Bij het aanmaken van een deck kiezen tussen een public of private deck.
    - Achteraf op de specifieke deckpagina, of in het overzicht van al zijn decks, een deck private/public maken door op een knop te drukken die de huidige sharestatus laat zien.


- **Zoeken naar decks** [Wireframe](https://github.com/HANICA-DWA/sep2019-project-kiwi/blob/development/Documentatie/Wireframes/Apprend-home-webapp-search%20page.svg) [Wireframe](https://github.com/HANICA-DWA/sep2019-project-kiwi/blob/development/Documentatie/Wireframes/Apprend-home-webapp-homepage-with-search.svg)
	> Als gast of (anonieme) gebruiker wil ik decks kunnen zoeken.
	De gebruiker kan:
    - Een deck zoeken aan de hand van een invoerveld.
    - Geholpen worden met zoeken aan de hand van suggesties.
    - Gelijk naar een deck gaan door op een suggestie te klikken.
    - De gebruiker gaat naar een resultatenpagina wanneer hij op enter of de zoekknop drukt.
    
- **Zoeken naar gebruikers** [Wireframe](https://github.com/HANICA-DWA/sep2019-project-kiwi/blob/development/Documentatie/Wireframes/Apprend-home-webapp-search%20page.svg) [Wireframe](https://github.com/HANICA-DWA/sep2019-project-kiwi/blob/development/Documentatie/Wireframes/Apprend-home-webapp-homepage-with-search.svg)
	> Als gast of (anonieme) gebruiker wil ik gebruikers kunnen zoeken.
	De gebruiker kan:
    - Een andere gebruiker zoeken aan de hand van een invoerveld.
    - Geholpen worden met zoeken aan de hand van suggesties.
    - Gelijk naar een gebruiker gaan door op een suggestie te klikken.
    - De gebruiker gaat naar een resultatenpagina wanneer hij op enter of de zoekknop drukt.

- **Registreren nieuw account**
[Wireframe](https://github.com/HANICA-DWA/sep2019-project-kiwi/blob/development/Documentatie/Wireframes/Apprend-registreren-webapp.svg)
	> Een gebruiker kan een account registreren om zijn of haar decks op alle apparaten te kunnen gebruiken. Wanneer een gebruiker anonieme gegevens heeft, zullen deze omgezet worden naar een nieuw gebruikersaccount. Het sessie-ID in de database wordt dan vervangen door een username. Wanneer een gebruiker geen anonieme gegevens heeft, zal er simpelweg een nieuw gebruikersaccount aangemaakt worden. De gebruiker wordt na het registreren automatisch ingelogd.
	De volgende invoervelden zijn aanwezig:
    - De gebruiker moet een gebruikersnaam opgeven. Deze moet uniek zijn en mag alleen letters of cijfers bevatten.
    - De gebruiker moet een E-mailadres opgeven. Deze moet uniek zijn en mag alleen letters of cijfers bevatten, met uitzondering van '@' en '.'.
    - De gebruiker moet een wachtwoord opgeven.
	- De gebruiker moet nogmaals een wachtwoord opgeven ter bevestiging.

- **Inloggen**
[Wireframe](https://github.com/HANICA-DWA/sep2019-project-kiwi/blob/development/Documentatie/Wireframes/Apprend-inloggen-webapp.svg)
	> De volgende invoervelden zijn aanwezig:
    - De gebruiker moet een gebruikersnaam opgeven.
    - De gebruiker moet een wachtwoord opgeven.

- **Uitloggen**
	> De gebruiker kan op uitloggen klikken om uit te loggen.
	> De gebruiker krijg een melding te zien dat hij of zij uitgelogd is.
	> De gebruiker wordt doorgestuurd naar de homepagina.
	
- **Accountgegevens wijzigen**
	> De gebruiker kan op zijn profielpagina zijn E-mailadres en wachtwoord aanpassen.

- **Account verwijderen**
	> De gebruiker heeft de optie om zijn account volledig te verwijderen. De gebruiker logt vervolgens uit en wordt doorgestuurd naar de homepagina.

- **AVG-melding**
	> De gebruiker ziet op elke pagina een AVG-melding met korte informatie onderin het scherm. De gebruiker kan vervolgens alle voorwaarden lezen of de voorwaarden accepteren. Wanneer de gebruiker de voorwaarden accepteert zal de melding niet meer getoond worden.

- **Filteren op tags** [Wireframe](https://github.com/HANICA-DWA/sep2019-project-kiwi/blob/development/Documentatie/Wireframes/Filter-Decks-With-Tags.svg)
	> De gebruiker kan op zijn overzicht met decks filteren op tags. De gebruiker ziet vervolgens
	
	
## Quality Attributes  
De onderstaande lijst bevat een overzicht van niet-functionele kwaliteitsattributen van het systeem.  
  
**Reliability**  
    - Het systeem is getest door middel van Jest unittests.  
    - Het systeem is getest door middel van Puppeteer end-to-end tests.  
    - Het systeem is getest door middel van Jest API-tests.  
  
**Security**  
    - Wachtwoorden worden geëncrypt opgeslagen volgens de Bcrypt encryptie.  
  
**Usability**  
    - Responsive, werkt op mobiele apparaten.  

**Legal, compliance and regulatory requirements**  
    - Voldoet aan de AVG-wetten.  
  
## Constraints  
De onderstaande lijst bevat een aantal beperkingen die de applicatie hebben gevormd tijdens het ontwikkelen. De meeste van deze beperkingen zijn door de product owner aan ons voorgelegd.  
  
- **Tijd**  
  > Het projectteam heeft een pre-game van 1 week, 3 sprints van 2 weken en een post-game van 1 week gekregen. Het project is begonnen op 11 november en eindigt op 17 januari. Hier zitten twee weken kerstvakantie tussen. 
 <br /> Binnen een sprint heeft het projectteam 46 uur per persoon beschikbaar kunnen stellen voor het ontwikkelen van de applicatie. Hier zijn afspraken en meetings al vanaf gehaald. Onverwachte problemen en onmacht zijn niet meegerekend in dit urenaantal. Door deze beperkte tijd zijn bepaalde user-stories geschrapt.  
- **Grootte van het projectteam**  
  > Het projectteam bestond uit vijf personen exclusief de product owner. Dit heeft effect gehad op de beschikbare ontwikkeltijd voor de applicatie.  
  
- **Kennis van het projectteam**  
  > Het projectteam was niet bekend met Jest (unittests), Puppeteer (end-to-end tests) en React Native. Jest en Puppeteer moesten sowieso geïmplementeerd worden. <br />  
 Er is een keuze gemaakt om niet alles te testen met end-to-end tests, aangezien de applicatie steeds veranderde. Het aanpassen van end-to-end tests kostte te veel tijd.<br /><br /> De opdrachtgever had ook graag een mobiele app willen zien als er tijd over was. Het team heeft besloten om React Native hiervoor te gaan gebruiken. Er is een onderzoek uitgevoerd om in te schatten of het omzetten van de webapplicatie naar React Native gemakkelijk en haalbaar is. De prioriteit is zeer laag.   
- **Gebruik van de Scrum methode.**  
  > Het projectteam heeft gebruik moeten maken van Scrum. Door deze flexibele methode te gebruiken zijn de meest gewenste user-stories geïmplementeerd en minder belangrijke mogelijk niet. Toch is de applicatie een werkend product, wat de bedoeling is van de Scrum methode. Zie het [Product Backlog](https://github.com/HANICA-DWA/sep2019-project-kiwi/projects/2?fullscreen=true&card_filter_query=label%3A%22user+story%22) voor een lijst met alle user-stories.  
  
- **Gebruik van GitHub**  
  > Het gebruik van GitHub was een eis vanuit de product owner. Alle documentatie moest ook in Markdown opgeslagen worden op de project repository.  
  
- **Gebruik van React**  
  > Het gebruik van React is vereist door de product owner.  
  
- **Gebruik van Redux**  
  > Het gebruik van Redux is vereist door de product owner.  
  
- **Gebruik van een NoSQL-database**  
  > Het gebruik van een NoSQL-database is vereist door de product owner. Het projectteam heeft gekozen voor MongoDB, want dit voldoet aan de snelheid- en opslagmogelijkheden.   
- **Gebruik van een Express API op een NodeJS server**  
  > Het gebruik van een Express API op een NodeJS server is vereist door de product owner.   
- **Gebruik van communicatie over HTTP**  
  > Aangezien er gebruik wordt gemaakt van een Express API moet data verzonden worden over het HTTP-protocol. De client-applicatie verstuurt JSON naar een serverapplicatie over HTTP. De server stuurt vervolgens ook weer iets terug over dit protocol. De server gebruikt de middleware bodyParser om JSON te parsen.  
  
- **Verwerking AVG voorwaarden**  
  > Het is wettelijk verplicht om aan te geven dat persoonsgegevens opgeslagen worden in een database. De product owner heeft ons verplicht om de gebruikers op de website cookie-meldingen te geven. Daarnaast moet de gebruiker akkoord gaan met algemene voorwaarden.  
  
## Principles  
  
**Client**  
  
- Voor elke pagina is een React Route aanwezig.  
- React componenten zijn functionele componenten.  
- "Build before buy", de applicatie bevat vooral zelfgemaakte algoritmes en functionaliteiten.  
- Unittests hebben een hogere prioriteit dan end-to-end tests.  
- Async action creators staan in een apart bestand.  
- Zo min mogelijk DRY code.  
- Componenten staan samen met subcomponentent, reducers en actions in een map voor die functionaliteit, als deze toch ergens anders gebruikt worden zullen zij in de shared map staan.
  
**Server**  
  
- Elk document in de database heeft een Mongoose schema en model.  
- Mongoose methodes worden gebruikt waar mogelijk.  
- API-endpoint URL's zijn RESTful waar mogelijk.  
- "Build before buy", de applicatie bevat vooral zelfgemaakte algoritmes en functionaliteiten.  
- Zo min mogelijk DRY code.  
- Zo veel mogelijk authenticatie en acties laten behandelen door middleware.
  
## Software Architecture  
De applicatie bestaat uit drie grote componenten zoals te zien in het onderstaande container diagram.  
  
![Apprend container diagram](https://github.com/HANICA-DWA/sep2019-project-kiwi/blob/development/Documentatie/C4%20model%20-%20Apprend%20Container.svg)  
  
Zoals te zien op bovenstaande figuur omvat de Apprend applicatie een React client, NodeJS server en MongoDB database. De client en server zullen databasegegevens uitwisselen over de ingebouwde Express API. Door gebruik te maken van de bodyParser middleware kan JSON-data gemakkelijk ontvangen worden.  
  
De server praat vervolgens met de database om gegevens op te halen of op te slaan. De server reageert op de verzoeken vanuit de client en kan eventueel gegevens meegeven.  
  
### React WebApp  
  
![Apprend container diagram](https://github.com/HANICA-DWA/sep2019-project-kiwi/blob/development/Documentatie/C4%20model%20-%20React%20Native%20App%20Component.svg)  

De folderstructuur van de client-applicatie bevat drie belangrijke mappen:

**components**

Deze map bevat verschillende mappen die een feature van de applicatie omvatten. Zo'n map bevat een hoofdcomponent (JSX-bestand), een map met subcomponenten, bijbehorende reducers en bijbehorende actions & async-actions. Wanneer iets zoals een component in meerdere features gebruikt wordt, zal deze in de 'shared' map te vinden zijn.


**redux-config**

Deze map bevat alle Redux-setup-bestanden. Het bevat de mainReducer, die alle reducers samenvoegt tot één, maar ook alle action-types en API-configuraties. Dat laatste bestand bevat bijvoorbeeld de URL waar de API-calls naartoe gestuurd moeten worden.


**util**

Deze map bevat overige functies die in principe los staan van alle features, maar toch door bepaalde features gebruikt worden. Het bevat het Leitner-systeem en formuliervalidaties. Deze functies zouden in principe als losse modules kunnen worden gezien, en het voordeel hiervan is dat deze flexibel bij verschillende features ingezet kunnen worden waar en wanneer nodig.
  
  
### NodeJS server  
  
![Apprend NodeJS server component diagram](https://github.com/HANICA-DWA/sep2019-project-kiwi/blob/development/Documentatie/NodeJS-server.svg)  
  
**Decks endpoints**:  
  
| Method | URL                                                      | Beschrijving                                            |
|--------|----------------------------------------------------------|---------------------------------------------------------|
| GET    | /api/v1/decks/home                                       | Haal de decks voor de homepage op.                      |
| GET    | /api/v1/decks/:deckId                                    | Haalt een specifiek deck op.                            |
| GET    | /api/v1/decks/:deckId/flashcards                         | Haalt alle flashcard van een deck op.                   |
| GET	 | /api/v1/decks/:username/tags	                            | Haalt alle decks van een user op.	                      |
| POST   | /api/v1/decks                                            | Maakt een nieuw deck aan.                               |
| POST	 | /api/v1/decks/:deckId                                    | Importeer een deck van een ander                        |
| POST   | /api/v1/decks/:deckId/flashcards                         | Edit flashcards van een specifiek deck.                 |
| PUT    | /api/v1/decks/:deckId/flashcards/:flashcardId/leitnerSelectCards    | Update box en sessionPlayed van een flashcard.          |
| PUT    | /api/v1/decks/:deckId/session                            | Update session van een deck.                            |
| DELETE | /api/v1/decks/:deckId                                    | Verwijdert een specifiek deck.                          |
| PATCH | /api/v1/decks/:deckId                                    | Zet een deck op public of private (toggle)                         |


**Users endpoints**:

| Method | URL                           | Beschrijving                                |
|--------|-------------------------------|---------------------------------------------|
| GET    | /api/v1/users/:username/decks | Haalt alle deck van een specifieke user op. |
| GET    | /api/v1/users/:id             | Haalt een gebruik op basis van id op.       |
| GET    | /api/v1/users/:id/_id         | Haalt een gebruik op bij ID bij het _id.    |
| GET    | /api/v1/users/email           | Haal een gebruiker op op basis van email.   |
| POST   | /api/v1/users/                | Maak een nieuwe gebruiker aan.              |
| DELETE | /api/v1/users/:id             | Verwijder een gebruiken op basis van id.    |

**Login endpoints**:

| Method | URL                  | Beschrijving                  |
|--------|----------------------|-------------------------------|
| GET    | /api/v1/login/succes | Redirect als het success is.  |
| GET    | /api/v1/login/error  | Redirect als er een error is. |
| POST   | /api/v1/login/check  | Kijk of de gegevens kloppen.  |

### MongoDB Database

![Apprend MongoDB Database component diagram](https://github.com/HANICA-DWA/sep2019-project-kiwi/blob/development/Documentatie/C4%20Model%20-%20MongoDB%20Database%20Component.svg)


## Infrastructure Architecture

### Algemeen




### Leitner systeem

Het [Leitner systeem](https://en.wikipedia.org/wiki/Leitner_system) is een simpele implementatie van [Spaced Repitition](https://en.wikipedia.org/wiki/Spaced_repetition), bedacht door de Duitse commentator en wetenschapspopularis Sebastian Leitner.

Dit systeem is binnen Apprend vertaald tot een algoritme dat flashcards voor de gebruiker selecteert. Het Leitner systeem moet het brein stimuleren om onderwerpen beter te onthouden. Er zijn een aantal variabelen aanwezig die handig zijn om te onthouden bij het lezen van deze paragraaf.

- X
    > Maximaal aantal kaarten dat bij elke sessie uit doos 0 wordt gehaald.

- W2
    > Kaarten uit doos 2 komen elke zoveel sessies terug.

- W3
    > Kaarten uit doos 3 komen elke zoveel sessies terug. Deze variabele moet altijd hoger zijn dan W2.
    

Bij het Leitner systeem worden flashcards verdeeld over een aantal dozen. Bij onze implementatie gebruiken we er 4.

- Doos 0
    > Deze doos bevat alle flashcards die nog niet eerder aan bod zijn gekomen. Zolang deze doos niet leeg is wordt er een **X** aantal kaarten uit dit deck gehaald en aan de selectie voor de huidige sessie toegevoegd. Zo krijgt de gebruiker elke sessie wat nieuwe kaarten te zien. Deze doos zal uiteindelijk leeg zijn en niet meer gebruikt worden.

- Doos 1
    > Flashcards in deze doos zullen elke sessie aan bod komen. Deze flashcards zijn in de vorige sessie fout beantwoord.
    
- Doos 2
    > Flashcards in deze doos zullen na **W2** dagen terugkomen. Dit zijn flashcards uit doos 1 die **W2** sessies terug goed zijn beantwoord.
    
- Doos 3
    > Flashcards in deze doos zullen na een bepaald aantal dagen terugkomen, maar dit moet langer zijn dan doos 2. Dit zijn flashcards uit doos 2 die **W3** sessies terug goed zijn beantwoord.

![Leitner systeem](https://github.com/HANICA-DWA/sep2019-project-kiwi/blob/development/Documentatie/Leitner%20systeem.svg)

Bij het spelen van een deck wordt er een selectie gemaakt aan kaarten dat bij de huidige sessie aan bod komt. De selectie is gebaseerd op het Leitner systeem en de formule ziet er als volgt uit:

*Selectie = (Maximaal **X** aantal kaarten uit doos 0 (als deze nog niet leeg is)) + (Alle flashcards uit doos 1) + (Alle kaarten uit doos 2 waarvan het huidige sessienummer - **W2** >= aan de 'sessionPlayed' van de kaart) + (Alle kaarten uit doos 3 waarvan het huidige sessienummer - **W3** >= aan de 'sessionPlayed' van de kaart)*

Elke flashcard houdt individueel zijn 'sessionPlayed' bij. Dit is het nummer van de sessie waarin deze kaart aan bod is gekomen. Elke flashcard houdt ook een 'box' nummer bij om aan te geven in welke doos deze zit.

Stel je voor **X** = 10, **W2** = 3 en **W3** = 5. Dit betekent dat doos 2 elke 3 sessies aan bod komt, en doos 3 elke 5 sessies. Een flashcard uit doos 0 of 1 kan in sessie 4 goed worden beantwoordt. Het sessionPlayed-nummer van de kaart wordt dan 4 en het box-nummer wordt 2, aangezien deze naar doos 2 verplaatst wordt. Deze kaart, nu uit doos 2, zal vervolgens weer terugkomen in sessie 7 terugkomen, omdat **_currentSession (7) - W2 (3) >= sessionPlayed van de flashcard en dus de sessie waarin de kaart goed is beantwoord (4)._**

### Verantwoordelijkheden client
De client-applicatie krijgt alle flashcards en maakt een selectie op basis van het Leitner systeem. 

### Verantwoordelijkheden server
De server-applicatie verplaatst flashcards naar de juiste doos op basis van het Leitner systeem en een goed of fout antwoord. 

### Situatie: Geen kaarten meer
Stel je voor dat een gebruiker aan het begin alle kaarten goed heeft, en er zijn geen kaarten meer over in doos 0. Deze kaarten worden dan naar doos 2 verplaatst en komen over **W2** sessies pas terug. De volgende sessie zou dan geen kaarten bevatten, omdat er niks in doos 1 zit. 
<br />
We hebben deze situatie opgelost door sessies over te slaan totdat er kaarten aanwezig zijn. Dit zal de client-applicatie uitvoeren en versturen naar de server.

### Situatie: Verloren kaarten
Stel je voor dat de gebruiker stopt met spelen in het midden van het spel. De kaarten die niet zijn gespeeld zullen nooit meer aan bod komen omdat de het sessionPlayed-nummer niet werd geüpdatet (dit gebeurt pas bij het opgeven van een antwoord). Dit hebben we opgelost door niet meer te kijken of (*huidige sessienummer - VARIABELE **gelijk** is aan de 'sessionPlayed' van de kaart*), maar *huidige sessienummer - VARIABELE **groter of gelijk** is aan de 'sessionPlayed' van de kaart*. Deze "verloren" kaarten zullen op deze manier altijd aan bod komen.

## Deployment
Hier komt Deployment (POST GAME)

## Operation and Support
Hier komt Operation and Support (POST GAME)
