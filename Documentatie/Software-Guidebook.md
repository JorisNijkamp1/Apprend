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
	> Wanneer een gebruiker **zonder** account een deck aanmaakt, worden zijn gegevens als anoniem in de database opgeslagen onder een sessie-ID. Deze wordt ook als cookie in de browser opgeslagen zodat de browser de anonieme gegevens kan ophalen.\
	\
	De volgende invoervelden zijn aanwezig:
		- De gebruiker kan een naam opgeven.
		- De gebruiker kan een beschrijving opgeven.

- **Decks bewerken**
[Wireframe](https://github.com/HANICA-DWA/sep2019-project-kiwi/blob/development/Documentatie/Wireframes/edit-deck.svg)
	> De volgende invoervelden zijn aanwezig:
		- De gebruiker kan een naam aanpassen.
		- De gebruiker kan een beschrijving aanpassen.

- **Decks verwijderen**
	> De gebruiker krijgt een bevestigingsmelding.

- **Flashcards uit een deck verwijderen**
[Wireframe](https://github.com/HANICA-DWA/sep2019-project-kiwi/blob/development/Documentatie/Wireframes/Flashcard-create-modify.svg)
	> De gebruiker kan een oneindig aantal flashcards toevoegen.\
	\
	De volgende invoervelden zijn aanwezig:
		- De gebruiker kan een vraag/term opgeven op de ene kant.
		- De gebruiker kan een antwoord/definitie opgeven op de andere kant.

- **Flashcards bewerken**
[Wireframe](https://github.com/HANICA-DWA/sep2019-project-kiwi/blob/development/Documentatie/Wireframes/Flashcard-create-modify.svg)
	>	De volgende invoervelden zijn aanwezig:
		- De gebruiker kan een vraag/term aanpassen op de ene kant.
		- De gebruiker kan een antwoord/definitie aanpassen op de andere kant.

- **Flashcards uit een deck verwijderen**
	> De gebruiker krijgt een bevestigingsmelding.

- **Deck spelen**
[Wireframe](https://github.com/HANICA-DWA/sep2019-project-kiwi/blob/development/Documentatie/Wireframes/Deck-playing.svg)
	> De gebruiker krijgt een selectie van kaarten die op willekeurige volgorde gepresenteerd worden. Dit is gebaseerd op het [Leitner Systeem](https://en.wikipedia.org/wiki/Leitner_system) (Zie hoofdstuk 7: Infrastructure Architecture).\
	\
	De gebruiker kan:
		- Een flashcard omdraaien om het antwoord of de definitie te tonen;
		- Een flashcard nogmaals omdraaien om de vraag of de term weer in te zien;
		- Aangeven of hij/zij de flashcard goed had;
		- Aangeven of hij/zij de flashcard fout had;
		- Het spel beëindigen;
		- Een scoreboard inzien wanneer het spelen voorbij is;

- **Registreren nieuw account**
[Wireframe](https://github.com/HANICA-DWA/sep2019-project-kiwi/blob/development/Documentatie/Wireframes/Apprend-registreren-webapp.svg)
	> Een gebruiker kan een account registreren om zijn of haar decks op alle apparaten te kunnen gebruiken. Wanneer een gebruiker anonieme gegevens heeft, zullen deze omgezet worden naar een nieuw gebruikersaccount. Het sessie-ID in de database wordt dan vervangen door een username. Wanneer een gebruiker geen anonieme gegevens heeft, zal er simpelweg een nieuw gebruikersaccount aangemaakt worden. De gebruiker wordt na het registreren automatisch ingelogd.\
	\
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

## Quality Attributes
De onderstaande lijst bevat een overzicht van niet-functionele kwaliteitsattributen van het systeem.

- **Reliability**
	- Het systeem is getest door middel van Jest unittests.
	- Het systeem is getest door middel van Puppeteer end-to-end tests.
	- Het systeem is getest door middel van Jest API-tests.

- **Security**
	- Wachtwoorden worden geëncrypt opgeslagen volgens de Bcrypt encryptie.

- **Usability**
	- Responsive, werkt op mobiele apparaten.

- **Legal, compliance and regulatory requirements**
	- Voldoet aan de AVG-wetten.

## Constraints
De onderstaande lijst bevat een aantal beperkingen die de applicatie hebben gevormd tijdens het ontwikkelen. De meeste van deze beperkingen zijn door de product owner aan ons voorgelegd.

- **Tijd**
	> Het projectteam heeft drie sprints van twee weken gekregen. Binnen een sprint heeft het projectteam 46 uur per persoon beschikbaar kunnen stellen voor het ontwikkelen van de applicatie. Hier zijn afspraken en meetings al vanaf gehaald. Onverwachte problemen en onmacht zijn niet meegerekend in dit urenaantal. Door deze beperkte tijd zijn bepaalde user-stories geschrapt.

- **Grootte van het projectteam**
	> Het projectteam bestond uit vijf personen exclusief de product owner. Dit heeft effect gehad op de beschikbare ontwikkeltijd voor de applicatie.

- **Kennis van het projectteam**
	> Het projectteam, exclusief de product owner, bestaat uit studenten. Hierdoor is de kennis beperkt geweest en zijn verschillende onderzoeken uitgevoerd om dit te compenseren. Dit heeft effect gehad op de beschikbare ontwikkeltijd voor de applicatie.

- **Gebruik van de Scrum methode.**
	> Het projectteam heeft gebruik moeten maken van Scrum. Hierdoor zijn bijbehorende afspraken ingepland, zoals de Scrum planning en review. Dit heeft effect gehad op de beschikbare ontwikkeltijd voor de applicatie.

- **Gebruik van GitHub**
	> Het gebruik van GitHub was een eis vanuit de product owner. Alle documentatie moest ook in Markdown opgeslagen worden op de project repository.

- **Gebruik van React**
	> 

- **Gebruik van Redux**
- **Gebruik van een NoSQL-database**
- **Gebruik van een Express API op een NodeJS server**
- **Gebruik van communicatie over HTTP**
- **Verwerking AVG voorwaarden**

## Principles
Hier komen de Principles

## Software Architecture
Hier komt de Software Architecture

## Infrastructure Architecture
Hier komt de Infrastructure Architecture

## Deployment
Hier komt Deployment

## Operation and Support
Hier komt Operation and Support
