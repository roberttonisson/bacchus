# Käivitamise juhend

Juhend on loodud Windowsil jooksva masina alusel.
Käivitamise eelduseks on, et arvutis on olemas Node(LTS) https://nodejs.org/en/download/.

### `git clone https://github.com/roberttonisson/bacchus.git`

Kloonige repositoorium oma arvutisse või tõmmake käistsi https://github.com/roberttonisson/bacchus/archive/main.zip

## Proxy serveri käivitamine

Liikuge kausta ../bacchus/proxy

### `npm install`

Installige vajalikud moodulid serveri käivitamiseks.

## Rakenduse käivitamine
Liikuge kasuta ../bacchus/bacchus-app

### `npm install`

Installige vajalikud mooduluid.

### `npm start`

Käivitage rakendus. Vaikimisi käivitub aadressil http://localhost:3000
NB! Rakenuse funksionaalseks tööks peab töötama ülal toodus proxy server.

## Rakendusest

Rakendus on loodud Node käitussüsteemis kasutades React.js raamistikku.
Kogu rakenduse loomiseks ja seadistamiseks kulus orinteeruvalt 12h.
Ei olnud kindel, kas soovite näha varasemate oksjonite salvestatud andmeid rakenduses, seega lisasin lehe, kus on näha kõik andmed.
