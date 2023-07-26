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
    id: 2,
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
  console.log(event.target.dataset);
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

let formContainer = null;

function showAddNoteForm() {
  if (formContainer) {
    formContainer.remove();
    formContainer = null;
    return;
  }
  formContainer = document.createElement('div');

  formContainer.classList.add('add-form');

  const form = document.createElement('form');
  form.innerHTML = `
    <label for="name">Name:</label>
    <input id="content" name="name" required></input>

    <label for="content">Content:</label>
    <textarea id="content" name="content" rows="3" required></textarea>

    <label for="category">Category:</label>
    <select id="category" name="category" required>
      <option value="Task">Task</option>
      <option value="Random Thought">Random Thought</option>
      <option value="Idea">Idea</option>
    </select>


    <button type="submit">Add</button>
  `;

  form.addEventListener('submit', handleFormSubmit);

  formContainer.appendChild(form);

  const addButton = document.querySelector('#addButton');

  addButton.insertAdjacentElement('afterend', formContainer);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const contentDates =
    formData.get('content').match(/\b\d{1,2}[\.\/]\d{1,2}[\.\/]\d{4}\b/g) || [];

  const newNote = {
    id: notes.length + 1,
    name: formData.get('name'),
    createdAt: formatDate(new Date().toISOString()),
    content: formData.get('content'),
    category: formData.get('category'),
    dates: contentDates,
    archived: false,
  };

  notes.push(newNote);

  form.parentElement.remove();
  formContainer = null;
  renderNotes();
}

function handleAddNote() {
  showAddNoteForm();
}
