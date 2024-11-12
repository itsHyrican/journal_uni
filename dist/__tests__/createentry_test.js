// Importiert die erforderlichen Funktionen und Typen aus einer anderen Datei.
import { createEntry, entries, init } from '../script';
// Gruppierung von Tests, die sich auf die Funktion createEntry beziehen.
describe('createEntry function', () => {
    // Vorbereitung des DOMs und der initialen Umgebung vor jedem Test.
    beforeEach(() => {
        // Setzen des HTML-Inhalts, der für die Tests benötigt wird, inklusive Eingabefelder für Titel, Inhalt und Datum.
        document.body.innerHTML = `
      <div id="entries"></div>
      <input type="text" id="title" value="Neuer Eintrag"/>
      <textarea id="content">Inhalt neuer Eintrag</textarea>
      <input type="date" id="entryDate" value="2025-01-01"/>
    `;
        // Initialisierung der Umgebung oder des Moduls, das getestet wird.
        init();
    });
    // Ein Test, der überprüft, ob die Funktion createEntry korrekt funktioniert.
    it('sollte einen neuen Eintrag generieren und ihn hinzufügen', () => {
        // Speichern der Anzahl der Einträge vor der Ausführung der Funktion.
        const initialEntriesCount = entries.length;
        // Aufruf der Funktion createEntry, die einen neuen Eintrag basierend auf den DOM-Eingabefeldern erstellt.
        createEntry();
        // Überprüfung, ob die Länge des Eintragsarray um eins zugenommen hat.
        expect(entries.length).toBe(initialEntriesCount + 1);
        // Überprüfung der Eigenschaften des neu hinzugefügten Eintrags.
        const newEntry = entries[0];
        expect(newEntry.title).toBe('Neuer Eintrag');
        expect(newEntry.content).toBe('Inhalt neuer Eintrag');
        expect(newEntry.date).toBe(new Date('2025-01-01').toLocaleString());
        // Überprüfung, ob die Eingabefelder nach der Erstellung des Eintrags zurückgesetzt wurden.
        expect(document.getElementById('title').value).toBe('');
        expect(document.getElementById('content').value).toBe('');
        expect(document.getElementById('entryDate').value).toBe('');
    });
});
