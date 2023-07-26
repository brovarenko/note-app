let notes = [
  {
    id: 1,
    name: 'Books',
    createdAt: '2023-07-25 12:00',
    content: 'Buy book',
    category: 'Task',
    dates: ['2023-06-20', '2023-08-20'],
    archived: false,
  },
  {
    id: 1,
    name: 'Books',
    createdAt: '2023-07-25 12:00',
    content: 'Buy book',
    category: 'Task',
    dates: ['2023-06-20', '2023-08-20'],
    archived: false,
  },
];

function renderNotes() {
  const notesContainer = document.querySelector('.notes-table');
  notesContainer.innerHTML = '';
  notes.forEach((note) => {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    const nameElement = document.createElement('div');
    nameElement.textContent = note.name;
    noteElement.appendChild(nameElement);
    const createdAtElement = document.createElement('div');
    createdAtElement.textContent = note.createdAt;
    noteElement.appendChild(createdAtElement);
    const contentElement = document.createElement('div');
    contentElement.textContent = note.content;
    noteElement.appendChild(contentElement);
    const categoryElement = document.createElement('div');
    categoryElement.textContent = note.category;
    noteElement.appendChild(categoryElement);
    const mentionedDatesElement = document.createElement('div');
    mentionedDatesElement.textContent = note.dates.join(', ');
    noteElement.appendChild(mentionedDatesElement);
    notesContainer.appendChild(noteElement);

    const deleteButton = document.createElement('button');
    const deleteIcon = document.createElement('i');
    deleteButton.classList.add('delete-button');
    deleteIcon.classList.add('fa-solid', 'fa-trash');
    deleteButton.appendChild(deleteIcon);
    deleteButton.setAttribute('data-note-id', note.id);
    noteElement.appendChild(deleteButton);
  });

  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', handleDeleteNote);
  });
}

function handleAddNote() {
  const newNote = {
    id: 1,
    name: 'Books',
    createdAt: '2023-07-25 12:00',
    content: 'Buy book',
    category: 'Task',
    dates: ['2023-06-20', '2023-08-20'],
    archived: false,
  };

  notes.push(newNote);

  renderNotes();
}

document.addEventListener('DOMContentLoaded', () => {
  renderNotes();

  const addButton = document.querySelector('#addButton');
  addButton.addEventListener('click', handleAddNote);
});

function handleDeleteNote(event) {
  const noteId = parseInt(event.target.dataset.noteId);
  try {
    const noteIndex = notes.findIndex((note) => note.id === noteId);
    if (noteIndex !== -1) {
      notes.splice(noteIndex, 1);
      renderNotes();
    }
  } catch (error) {
    console.error(error.message);
  }
}
