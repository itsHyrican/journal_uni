// Importieren notwendiger Funktionen und Typen
import { displayEntries, entries } from '../script';
// Gruppierung der Tests zur Funktion 'displayEntries'.
describe('displayEntries function', () => {
    let entriesContainer; // Deklaration einer Variable, die den Container für Einträge speichert.
    // Initialisierung der Testumgebung vor jedem Test.
    beforeEach(() => {
        // Setzt den HTML-Inhalt des body-Elements, um den Container für die Einträge zu inkludieren.
        document.body.innerHTML = '<div id="entries"></div>';
        // Zuweisung des DOM-Elements zu 'entriesContainer'.
        entriesContainer = document.getElementById('entries');
        // Definition von simulierten Eintragsdaten.
        const mockEntries = [
            {
                id: '1',
                title: 'Erster Eintrag',
                content: 'Inhalt erster Eintrag',
                date: '2025-01-01',
                bookmarked: false,
            },
            {
                id: '2',
                title: 'Zweiter Eintrag',
                content: 'Inhalt zweiter Eintrag',
                date: '2025-01-01',
                bookmarked: true,
            },
        ];
        // Ersetzen der echten Einträge im 'entries' Array durch die simulierten Daten.
        entries.splice(0, entries.length, ...mockEntries);
    });
    // Definition des Tests, der überprüft, ob 'displayEntries' die Einträge korrekt anzeigt.
    it('sollte entries korrekt anzeigen', () => {
        // Aufruf der Funktion, die die Einträge im DOM anzeigt.
        displayEntries();
        // Überprüfung, ob die Anzahl der Kind-Elemente im 'entriesContainer' der Anzahl der Einträge entspricht.
        expect(entriesContainer.children.length).toBe(entries.length);
        // Überprüfung für jeden Eintrag, ob er korrekt gerendert wird.
        entries.forEach((entry, index) => {
            const entryDiv = entriesContainer.children[index];
            // Überprüfung des Titels.
            const titleParagraph = entryDiv.querySelector('.title');
            expect(titleParagraph.textContent).toBe(entry.title);
            // Überprüfung des Datums.
            const dateParagraph = entryDiv.querySelector('.date');
            expect(dateParagraph.textContent).toContain(entry.date);
            // Überprüfung des Inhalts.
            const contentParagraph = entryDiv.querySelector('.content');
            if (entry.content.length > 500) {
                // Falls der Inhalt länger als 500 Zeichen ist, wird nur der Anfang geprüft.
                expect(contentParagraph.textContent).toContain(entry.content.substring(0, 500));
            }
            else {
                expect(contentParagraph.textContent).toContain(entry.content);
            }
            // Überprüfung des Lesezeichenstatus.
            const bookmarkCheckbox = entryDiv.querySelector('.bookmark-checkbox');
            expect(bookmarkCheckbox.checked).toBe(entry.bookmarked);
        });
    });
});
