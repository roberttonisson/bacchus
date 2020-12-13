# Käivitamise juhend

Juhend on loodud Windowsil jooksva masina alusel.
Käivitamise eelduseks on, et arvutis on olemas Node(LTS) https://nodejs.org/en/download/.

### `git clone https://github.com/roberttonisson/bacchus.git`

Kloonige repositoorium oma arvutisse või tõmmake käistsi https://github.com/roberttonisson/bacchus/archive/main.zip

## Proxy serveri käivitamine

Liikuge kausta ../bacchus/proxy

### `npm install`

Installige vajalikud moodulid serveri käivitamiseks.

### `node server.js`

Käivitage proxy server.

## Rakenduse käivitamine

Liikuge kausta ../bacchus/bacchus-app

### `npm install`

Installige vajalikud mooduluid.

### `npm start`

Käivitage rakendus. Vaikimisi käivitub aadressil http://localhost:3000

NB! Rakenuse funksionaalseks tööks peab töötama ülal toodud proxy server, et vajalikud andmed APIst kätte saada.

## Rakendusest

Rakendus on loodud Node käitussüsteemis kasutades React.js raamistikku. CORS Policy probleemi lahendamiseks lõin oma proxy serveri.
Kogu rakenduse loomiseks ja seadistamiseks kulus orinteeruvalt 13h.
