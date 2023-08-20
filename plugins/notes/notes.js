document.addEventListener("DOMContentLoaded", function () {
  const noteInput = document.getElementById("noteInput");
  const saveButton = document.getElementById("saveButton");
  const notesContainer = document.getElementById("notes");
  const clearAll = document.getElementById("clearAll");

  function getDeleteButton() {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
  }

  function generateUniqueId() {
    const timestamp = new Date().getTime();
    const randomId = Math.floor(Math.random() * 10000);
    const uniqueId = `${timestamp}-${randomId}`;
    return uniqueId;
  }

  clearAll.addEventListener("click", function () {
    // Setting the notes list to an empty list
    chrome.storage.sync.set({ notes: [] }, function () {
      notesContainer.textContent = '';
    });
  });

  saveButton.addEventListener("click", function () {
    const noteText = noteInput.value.trim();
    if (noteText !== "") {
      chrome.storage.sync.get({ notes: [] }, function (result) {
        const notes = result.notes;
        const uniqueId = generateUniqueId();
        const noteObject = { [uniqueId]: noteText };
        notes.push(noteObject);
        chrome.storage.sync.set({ notes: notes }, function () {
          // Clearing value of Input field
          noteInput.value = "";
          // Creating a new note element
          const noteElement = document.createElement("div");
          noteElement.classList.add("note");
          noteElement.textContent = noteText;
          noteElement.setAttribute("id", uniqueId);
          // Creating a delete button to delete the note
          const deleteButton = getDeleteButton();
          deleteButton.addEventListener("click", function () {
            deleteNote(uniqueId);
          });
          noteElement.appendChild(deleteButton); // Appending the delete button to the note element
          // Appending the note element to the notes container
          notesContainer.appendChild(noteElement);
        });
      });
    }
  });

  function displayNotes(notes) {
    notesContainer.textContent = ''; // Clearing the notes container

    notes.forEach(function (noteObj) {
      const uniqueId = Object.keys(noteObj)[0];
      const noteText = noteObj[uniqueId];

      const noteElement = document.createElement("div");
      noteElement.classList.add("note");
      noteElement.textContent = noteText;
      noteElement.setAttribute("id", uniqueId); // Set the unique ID as the element's ID

      const deleteButton = getDeleteButton();
      deleteButton.addEventListener("click", function () {
        deleteNote(uniqueId);
      });

      noteElement.appendChild(deleteButton);
      notesContainer.appendChild(noteElement);
    });
  }

  function deleteNote(noteId) {
    // Find the note element by its unique ID
    const noteElement = document.getElementById(noteId);

    if (noteElement) {
      // Remove the note element from the UI
      noteElement.remove();

      // Remove the note from storage
      chrome.storage.sync.get({ notes: [] }, function (result) {
        const notes = result.notes.filter(noteObj => {
          return Object.keys(noteObj)[0] !== noteId;
        });

        // Update the notes in storage without the deleted note
        chrome.storage.sync.set({ notes: notes });
      });
    }
  }

  chrome.storage.sync.get({ notes: [] }, function (result) {
    const notes = result.notes;
    displayNotes(notes);
  });
});