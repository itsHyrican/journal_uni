export let showBookmarkedOnly = false;
export let entriesLoaded = 5; // Startwert für die Anzahl der initial geladenen Einträge
export const entriesPerLoad = 1; // Anzahl der Einträge, die nach jedem Scroll-Event geladen werden
// Liest die gespeicherten Journal-Einträge aus dem LocalStorage oder initialisiert ein leeres Array, wenn nichts gespeichert ist
export const entries = JSON.parse(localStorage.getItem("journalEntries") || "[]");
export function createEntry() {
    const titleInput = document.getElementById("title");
    const contentTextarea = document.getElementById("content");
    const entryDateInput = document.getElementById("entryDate");
    // Verwende das ausgewählte Datum oder das aktuelle Datum, falls kein Datum ausgewählt wurde
    const entryDate = entryDateInput.value ? new Date(entryDateInput.value) : new Date();
    // Erstellt ein neues JournalEntry-Objekt mit einer eindeutigen ID (aktuelle Zeit in Millisekunden),
    // dem Titel, dem Inhalt, und dem formatierten Datum. Der Eintrag ist standardmäßig nicht als Lesezeichen markiert.
    const newEntry = {
        id: new Date().getTime().toString(), // Eindeutige ID basierend auf dem aktuellen Zeitstempel
        title: titleInput.value,
        content: contentTextarea.value,
        date: entryDate.toLocaleString(), // Verwende das ausgewählte Datum
        bookmarked: false,
    };
    entries.unshift(newEntry); // Füge den neuen Eintrag am Anfang des Arrays hinzu
    // Speichert das aktualisierte Array von Journaleinträgen im LocalStorage des Browsers.
    localStorage.setItem("journalEntries", JSON.stringify(entries));
    // Setze die Eingabefelder zurück
    titleInput.value = "";
    contentTextarea.value = "";
    entryDateInput.value = ""; // Setze das Datumsauswahl-Element zurück
    displayEntries();
}
// Die Funktion 'displayEntries' nimmt optional einen Boolean 'loadMore' an, der steuert, ob weitere Einträge dynamisch nachgeladen werden sollen.
export function displayEntries(loadMore = false) {
    // Greift auf das HTML-Element zu, das die Journal-Einträge enthält.
    const entriesContainer = document.getElementById("entries");
    let filteredEntries = showBookmarkedOnly ? entries.filter(entry => entry.bookmarked) : entries;
    if (!loadMore) {
        entriesContainer.innerHTML = ""; // Lösche Einträge nur, wenn nicht nachgeladen wird
    }
    // Berechne, ab welchem Eintrag begonnen werden soll, falls nachgeladen wird
    let startIndex = loadMore ? entriesLoaded - entriesPerLoad : 0;
    // Berechne, wie viele Einträge maximal angezeigt werden sollen
    let entriesToShow = filteredEntries.slice(startIndex, entriesLoaded);
    entriesToShow.forEach((entry) => {
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");
        const titleParagraph = document.createElement("p");
        titleParagraph.classList.add("title");
        titleParagraph.textContent = entry.title;
        const dateParagraph = document.createElement("p");
        dateParagraph.classList.add("date");
        dateParagraph.textContent = `Erstellt am: ${entry.date}`;
        // Erstellt und fügt das Element für den Inhalt hinzu, inklusive einer Erweiterungsoption, falls der Inhalt lang ist.
        const contentParagraph = document.createElement("p");
        contentParagraph.classList.add("content");
        if (entry.content.length > 500) {
            contentParagraph.textContent = entry.content.substring(0, 500) + "...";
            const moreLink = document.createElement("span");
            moreLink.textContent = " ausklappen";
            moreLink.style.color = "blue";
            moreLink.style.cursor = "pointer";
            moreLink.onclick = () => {
                contentParagraph.textContent = entry.content;
                moreLink.remove();
            };
            contentParagraph.appendChild(moreLink);
        }
        else {
            contentParagraph.textContent = entry.content;
        }
        // Fügt eine Checkbox für Lesezeichen hinzu.
        const bookmarkCheckbox = document.createElement("input");
        bookmarkCheckbox.type = "checkbox";
        bookmarkCheckbox.id = `bookmark-${entry.id}`;
        bookmarkCheckbox.checked = entry.bookmarked;
        bookmarkCheckbox.classList.add("bookmark-checkbox");
        bookmarkCheckbox.addEventListener("change", () => toggleBookmark(entry.id));
        // Erstellt ein Label für die Checkbox.
        const bookmarkLabel = document.createElement("label");
        bookmarkLabel.htmlFor = bookmarkCheckbox.id;
        bookmarkLabel.classList.add("bookmark-label");
        // Erstellt und fügt einen Lösch-Button hinzu.
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button"; // Weise die CSS-Klasse zu
        deleteButton.textContent = "X";
        deleteButton.onclick = () => deleteEntry(entry.id);
        // Fügt alle Elemente zum Eintrags-Div hinzu.
        entryDiv.appendChild(titleParagraph);
        entryDiv.appendChild(dateParagraph);
        entryDiv.appendChild(contentParagraph);
        entryDiv.appendChild(bookmarkCheckbox);
        entryDiv.appendChild(bookmarkLabel);
        entryDiv.appendChild(deleteButton);
        // Fügt das Eintrags-Div zum Hauptcontainer hinzu.
        entriesContainer.appendChild(entryDiv);
    });
}
// Die Funktion 'toggleBookmark' nimmt die ID eines Journal-Eintrags als String entgegen.
export function toggleBookmark(entryId) {
    // Findet den Index des Eintrags im Array 'entries' basierend auf der gegebenen ID.
    const entryIndex = entries.findIndex((entry) => entry.id === entryId);
    if (entryIndex !== -1) {
        // Schaltet den 'bookmarked'-Status des Eintrags um (wenn true, dann false und umgekehrt).
        entries[entryIndex].bookmarked = !entries[entryIndex].bookmarked;
        localStorage.setItem("journalEntries", JSON.stringify(entries));
        displayEntries();
    }
}
export function toggleFilter() {
    // Schaltet die globale Variable 'showBookmarkedOnly' um.
    showBookmarkedOnly = !showBookmarkedOnly;
    updateFilterButton();
    displayEntries(); // Neu laden der Einträge mit dem aktuellen Filterstatus
}
// Updated den Filterbutton, je nachdem ob der Filter aktiv oder inaktiv ist.
export function updateFilterButton() {
    const filterButton = document.getElementById("filterButton");
    if (showBookmarkedOnly) {
        filterButton.classList.remove("filter-off");
        filterButton.classList.add("filter-on");
    }
    else {
        filterButton.classList.remove("filter-on");
        filterButton.classList.add("filter-off");
    }
}
// Die Funktion 'deleteEntry' nimmt die ID eines Journal-Eintrags als String entgegen und gibt nichts zurück.
export function deleteEntry(entryId) {
    const entryIndex = entries.findIndex((entry) => entry.id === entryId);
    // Überprüft, ob ein Eintrag mit der angegebenen ID gefunden wurde.
    if (entryIndex !== -1) {
        // Entfernt den Eintrag aus dem Array. Die Methode 'splice' wird genutzt, um genau einen Eintrag am gefundenen Index zu löschen.
        entries.splice(entryIndex, 1);
        // Aktualisiert den LocalStorage, indem das geänderte Array von Einträgen neu gespeichert wird.
        localStorage.setItem("journalEntries", JSON.stringify(entries));
        displayEntries(); // Aktualisiere die Anzeige
    }
}
// Initialisiere das Modul
export function init() {
    // Event-Listener der wartet ob das DOM fertig geladen ist, führt daraufhin displayEntries aus.
    document.addEventListener("DOMContentLoaded", () => {
        displayEntries();
        updateFilterButton();
        // Greift auf den Filter-Button im DOM zu und fügt einen Klick-Event-Listener hinzu.
        const filterButton = document.getElementById("filterButton");
        filterButton.addEventListener("click", toggleFilter);
    });
    // Fügt einen Event-Listener für das Scroll-Ereignis des Fensters hinzu.
    // Fügt einen Event-Listener für das Scroll-Ereignis des Fensters hinzu.
    window.addEventListener("scroll", () => {
        const totalEntries = showBookmarkedOnly ? entries.filter(entry => entry.bookmarked).length : entries.length;
        // Überprüft, ob der Benutzer zum Ende der Seite gescrollt hat und ob noch mehr Einträge zum Laden vorhanden sind
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight && entriesLoaded < totalEntries) {
            entriesLoaded += entriesPerLoad; // Erhöhe die Anzahl der zu ladenden Einträge um 1
            if (entriesLoaded > totalEntries) { // Stellt sicher, dass nicht mehr Einträge geladen werden, als vorhanden
                entriesLoaded = totalEntries;
            }
            displayEntries(true); // Lade mehr Einträge, ohne die bestehenden zu löschen
        }
    });
}
