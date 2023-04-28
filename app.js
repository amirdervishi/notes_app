const notesContainer = document.getElementById("notes-container");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");
const saveBtn = document.getElementById("save-btn");
const searchInput = document.getElementById("search-input");
let notes = JSON.parse(localStorage.getItem("notes")) || [];

function displayNotes() {
  notesContainer.innerHTML = "";
  const searchTerm = searchInput.value.toLowerCase();
  notes
    .filter((note) => {
      return (
        note.title.toLowerCase().includes(searchTerm) ||
        note.body.toLowerCase().includes(searchTerm)
      );
    })
    .forEach((note, index) => {
      const noteEl = document.createElement("div");
      noteEl.classList.add("note");
      noteEl.innerHTML = `
      <h2>${note.title}</h2>
      <p>${note.body}</p>
      <button onclick="editNote(${index})">Edit</button>
      <button onclick="deleteNote(${index})">Delete</button>
    `;
      notesContainer.appendChild(noteEl);
    });
}

function saveNote() {
  const title = titleInput.value;
  const body = bodyInput.value;
  if (!title || !body) {
    alert("Please enter a title and note");
    return;
  }
  const note = { title, body };
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
  titleInput.value = "";
  bodyInput.value = "";
  displayNotes();
}

function editNote(index) {
  const note = notes[index];
  titleInput.value = note.title;
  bodyInput.value = note.body;
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}

function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}

displayNotes();

saveBtn.addEventListener("click", saveNote);
searchInput.addEventListener("input", displayNotes);
