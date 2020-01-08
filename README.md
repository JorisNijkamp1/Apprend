# [sep2019-project-kiwi](https://en.wikipedia.org/wiki/Kiwi)


### Leden

- Aaron van den Berg
- Niels Bogers
- Jesse Koerhuis
- Joris Nijkamp
- Gino Verwijs

### Product Owner

Fritz van Deventer

### Coach

Lars Tijsma

### Skills 
Helen Visser

# Deployment

### Vereisten
Zorg dat de laatste versies van [NodeJS](https://nodejs.org/) en [MongoDB](https://www.mongodb.com/) beschikbaar en gestart zijn op de deployment server.

### Stap 1 - De repository clonen
Clone de **master** branch van de [Apprend-repository](https://github.com/HANICA-DWA/sep2019-project-kiwi/tree/master).

### Stap 2 - Installeer packages client
Er zijn eigenlijk twee applicaties aanwezig in deze repository, een client en een server applicatie. Hiervoor moeten aparte packages worden geïnstalleerd. 
Voer de volgende commando's uit in de **apprend\Clients\apprend-web** folder:
```
> npm i
```

### Stap 3 - Installeer packages server
Voer de volgende commando's uit in de **apprend\Server** folder:
```
> npm i
```

### Stap 4
Voeg het bestand **apprend\Server\config.js** toe. Deze moet de onderstaande code bevatten. Voer hier zelf jouw database-gegevens in of laat deze file met rust wanneer je het lokaal gaat installeren.
```js
// De gebruikersnaam voor database-toegang.
const USERNAME = '';

// Het wachtwoord voor database-toegang.
const PASSWORD = '';

// De URL van de database server.
const HOST = 'localhost';

// De poort waar de database op draait. Voor MongoDB is dit standaard '27017'
const PORT = '27017';

// De naam van de database die gebruikt gaat worden.
const DB = 'apprend';

// Er kan eventueel ingesteld worden waar de wachtwoorden mee gesalt worden. Dit moet een getal zijn en is standaard 10.
const PASSWORD_SALT = 10;

module.exports = {USERNAME, PASSWORD, HOST, PORT, DB, PASSWORD_SALT};
```

### Stap 5
In **apprend\Server\app.js** staan twee regels (regel 55, 56) code voor een verbinding met de database. 
De eerste regel wordt gebruikt voor lokale ontwikkeling. De tweede regel code moet gebruikt worden voor op de deployment server.
```js
// Local
mongoose.connect(`mongodb://${srvConfig.USERNAME}:${srvConfig.PASSWORD}@${srvConfig.HOST}:${srvConfig.PORT}/${srvConfig.DB}`, {

// Deployment server
// mongoose.connect(`mongodb+srv://${srvConfig.USERNAME}:${srvConfig.PASSWORD}@${srvConfig.HOST}/${srvConfig.DB}?retryWrites=true&w=majority`, {
```

### Stap 6
Doe hetzelfde als stap 5 in **apprend\Server\seed.js**. 
Dit script kan gebruikt worden voor het invoeren van testdata in de database.

### Stap 7
Vervang de API_URL-variabele met de huidige server-URL in **apprend\Clients\apprend-web\src\redux\urls.js**.
Dit is de URL die gebruikt wordt door de client-applicatie om de server-API te bereiken.

### Stap 8
Voer de volgende commando's uit in **apprend\Server** om de server te starten:
```
> node app.js
```

### Stap 9
Voer de volgende commando's uit in **apprend\Clients\apprend-web** om de client-applicatie te starten:
```
> npm start
```
