document.addEventListener("DOMContentLoaded", function () {
    const noteInput = document.getElementById("noteInput");
    const saveButton = document.getElementById("saveButton");
    const notesContainer = document.getElementById("notes");
  
    saveButton.addEventListener("click", function () {
      const noteText = noteInput.value.trim();
      if (noteText !== "") {
        chrome.storage.sync.get({ notes: [] }, function (result) {
          const notes = result.notes;
          notes.push(noteText);
          chrome.storage.sync.set({ notes: notes }, function () {
            noteInput.value = "";
            displayNotes(notes);
          });
        });
      }
    });
  
    function displayNotes(notes) {
      notesContainer.innerHTML = "";
      notes.forEach(function (note) {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.textContent = note;
        notesContainer.appendChild(noteElement);
      });
    }
  
    chrome.storage.sync.get({ notes: [] }, function (result) {
      const notes = result.notes;
      displayNotes(notes);
    });
  });