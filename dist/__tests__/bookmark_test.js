// Importieren erforderlicher Funktionen und Typen
import { toggleBookmark, entries } from '../script';
// Setup: Vorbereitung mit simulierten Daten und Initialisierung des DOM
const mockEntry = {
    id: '1',
    title: 'Test Eintrag',
    content: 'Testeintrag für Lesezeichen',
    date: '2024-06-18',
    bookmarked: false,
};
// beforeEach wird vor jedem Testlauf ausgeführt, um sicherzustellen, dass die Testumgebung bereit ist.
beforeEach(() => {
    // Hinzufügen des simulierten Eintrags zur Liste der Einträge.
    entries.push(mockEntry);
    // Simulieren des Speicherns der Einträge in localStorage, einem Speicherbereich, der Daten im Browser speichert.
    localStorage.setItem('journalEntries', JSON.stringify(entries));
    // Aufbau des HTML-DOMs, der für die Tests verwendet wird.
    document.body.innerHTML = `
    <div id="entries"></div>
    <button id="filterButton">Filter</button>
  `;
});
// Definition eines Tests, der überprüft, ob die Funktion toggleBookmark funktioniert.
test('toggleBookmark sollte den Wert auf 1 setzen', () => {
    // Aufruf der Funktion toggleBookmark mit der ID '1'.
    toggleBookmark('1');
    // Assertions, um sicherzustellen, dass die erwarteten Änderungen stattgefunden haben.
    // Überprüfung, ob das bookmarked-Attribut des ersten Eintrags auf true gesetzt wurde.
    expect(entries[0].bookmarked).toBe(true);
    // Überprüfung, ob die Einträge korrekt im localStorage gespeichert wurden.
    const storedEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    expect(storedEntries.length).toBe(1);
    expect(storedEntries[0].bookmarked).toBe(true);
});
