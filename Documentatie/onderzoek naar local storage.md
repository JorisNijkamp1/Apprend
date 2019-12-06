# Onderzoek naar local storage

### Waarom doe ik dit onderzoek?

  > Om onze app offline te kunnen laten werken zullen wij local data moeten opslaan per gebruiker. Ik ben op moment van schrijven niet bekend met localStorage/localForage. LocalStorage wordt hiervoor gebruikt en localForge is uitbreiding hiervan.
  
### Hoe ga ik mijn onderzoek doen?

  > Ik ga op het internet de API van localStorage bekijken en zelf kleine reactcomponenten maken die hiervan gebruik maken. Hetzelfde zal ik doen voor localForage. Ik ga onderzoeken of deze technieken nuttig zijn voor ons project en de mogelijkheden en limieten hiervan opzoeken. Aan de hand daarvan kan ik mijn team adviseren/inlichten om wel of niet gebruik te maken van deze technieken.
  
### Wat is local storage?

  > Local storage is een variant van web storage. Dit geeft webapplicaties methodes om data op te kunnen slaan op de client. Wanneer de client de browser afsluit, dan gaat de data niet verloren die opgeslagen is in de local storage.
  De datatype waarin je data mee opslaat in de local storage zijn strings.\
  \
  Tijdens het testen van localStorage ben ik er achter gekomen dat als je types anders dan een string opslaat, deze geconverteerd worden naar een string. 
  
#### Wat zijn de eigenschappen van local storage?
    
- Maximale opslaggrootte is 5 tot 10 MB voor firefox en chrome/IE respectievelijk.
- Opgeslagen data heeft als datatype String.
- Heeft geen experiation date.
- Synchroon

#### Wat is localForage?

- LocalForage werkt asynschroon met callbacks of promises, waar localStorage synchroon is.
- LocalForage moet geïmporteerd worden van bijvoorbeeld npm. Het is een module.
- Met localForage kun je andere datatypes opslaan, localForage doet automatisch json parsen en stringyfyen.
- Gebruikt indexedDB, een NoSQL database op de client. Niet gebonden aan de 5 MB opslag limit.
- Met localForage kun je meerdere 'stores' hebben waarin je data opslaat.

#### Hoe weet de app of de data offline en/of online opgeslagen met worden?

> De browser heeft hiervoor functionaliteit die controleert of er verbinding is met internet. Dit kan door navigator.onLine te checken. Als deze true returned, heeft de browser verbinding. Vervolgens kun je events triggeren wanneer deze status verandert. Hiermee kun je dus de twee databases syncen.

#### Wat voegt local storage toe aan onze webapplicatie?

> Hoe onze applicatie op dit momemt werkt is het niet mogelijk om offline functionaliteit te bieden.  Omdat we speeldata op de server opslaan heeft de gebruiker internet nodig om deze te verkrijgen.
Dit geldt ook voor anonieme gebruikers die zelf decks hebben gemaakt.\
\
Door deze decks op de client op te slaan houden wij de database schoon van gebruikers die decks maken die bijvoorbeeld leeg/weinig gevuld zijn. Omdat zij een cookie met een sesssion id nodig hebben kunnen zij net als bij local storage alleen decks op dezelfde device spelen. In het geval dat zij de cookie verwijderen, verliezen zij de toegang tot hun decks/account.\
Local storage is minder bekend bij mensen en de kans dat deze per abuis geleegd wordt is kleiner dan cookies.
\
\
Ook kan de gebruiker zijn decks spelen wanneer hij geen toegang tot internet heeft. Wanneer hij wel weer een verbinding heeft, dan kan er gesynchroniseerd worden. Dit is een feature die wij als team als zeer prettig zien voor gebruikers.

#### Wat moeten we aanpassen om over te gaan naar local storage?

> Om effectief gebruik te kunnen maken van local storage zullen bij alles wat we tot nu toe hebben gemaakt, code in zijn geheel of gedeeltelijk moeten herschrijven. Denk hierbij aan het registreren als anonieme gebruiker, hij zal dan niet meer obv een cookie 'inloggen' en zo zijn gegevens ophalen maar enkel op zijn device.\
Verder zullen we functionaliteit moeten maken waarmee we local storage syncen met de database wanneer er een internetverbinding is. Dit moet dan gebeuren bij oa decks aanmaken, bewerken, verwijderen, flashcards aanmaken, bewerken, verwijderen en het spelen van het spel zelf.

## Conclusie

> Ik zou heel graag local storage of een variant hiervan (bijv. localforage) willen gebruiken tijdens dit project maar ik ben bang dat we niet de tijd hebben om dit te implementeren zonder daarvoor teveel tijd van andere taken af te halen.\
\
Daarnaast zullen we ons moeten verdiepen op het gebruik van service workers om een progressive webapp(PWA) te maken, want zonder een internet verbinding en de cache die een PWA biedt kan de gebruiker niet gebruik maken van onze webapplicatie.\
\
Ik denk dat het verstandig is om dit aan de product owner te vragen en wat zijn voorkeur heeft in dit geval. Meer functionaliteit of offline mogelijkheden aan het einde van deze sprint.

#### Mijn gemaakte test

- https://github.com/HANICA-DWA/sep2019-project-kiwi/blob/test/localforage/apprend/Clients/apprend-web/src/components/test-components/TestLocalStorage.jsx

#### Bezochte paginas om informatie in te winnen

- https://developers.google.com/web/tools/chrome-devtools/storage/indexeddb
- https://blog.bitsrc.io/how-to-build-a-react-progressive-web-application-pwa-b5b897df2f0a
- https://hacks.mozilla.org/2010/01/offline-web-applications/
- https://stackoverflow.com/questions/2631087/how-to-synchronize-html5-local-webstorage-and-server-side-storage
- https://localforage.github.io/localForage/
- https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
- https://developer.mozilla.org/nl/docs/Web/Progressive_web_apps

