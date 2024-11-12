# Readme für das Journal-Projekt

## Projektbeschreibung

Das Projekt ist einfach auszuführen: Öffnen Sie einfach die Datei "journal.html" in Ihrem Browser, um Einträge zu erstellen und anzuzeigen. 
Eine funktionierende Live-Version finden Sie auf meinem Server unter: https://voltagex.de/journal/journal.html.


### Eingebaute Features


# Pflichtfunktionen:

- Anzeigen von Journaleinträgen
- Erstellen und Anzeigen eines neuen Eintrags
- Wichtige Journaleinträge können markiert werden
- Begrenzung der Länge von Journaleinträgen


# Optionale Funktionen:

- Persistente Speicherung, z.B. mittels localStorage des Browsers
- Alternatives Erstellungsdatum
- Scrollen durch Journaleinträge


# Zusatzfunktion:

- Löschoption für Journaleinträge


####  Installation + Ausführen der Unit-Tests

Um die Unit-Tests auszuführen, öffnen Sie den gesamten Projektordner in Visual Studio Code (VSC) und führen Sie anschließend folgende Befehle aus:

``` npm test ``` 

Dies sollte die Tests erfolgreich durchlaufen. Falls dies nicht der Fall ist, könnte eine Abhängigkeit fehlen. Installieren Sie diese mit den folgenden Befehlen:

TSC npm install --save-dev typescript
JEST: npm install --save-dev jest ts-jest @types/jest
JEST LOCALSTORAGE: npm install --save-dev jest-localstorage-mock
JEST JDOM: npm install --save-dev jest-environment-jsdom
