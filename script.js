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
