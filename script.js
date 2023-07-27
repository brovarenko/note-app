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

    const buttonsElement = document.createElement('div');
    noteElement.appendChild(buttonsElement);

    const deleteButton = document.createElement('button');
    const deleteIcon = document.createElement('i');
    deleteButton.classList.add('delete-button');
    deleteIcon.classList.add('fa-solid', 'fa-trash');
    deleteButton.appendChild(deleteIcon);
    deleteButton.setAttribute('data-note-id', note.id);
    buttonsElement.appendChild(deleteButton);

    const editButton = document.createElement('button');
    const editIcon = document.createElement('i');
    editButton.classList.add('edit-button');
    editIcon.classList.add('fa-solid', 'fa-pencil');
    editButton.appendChild(editIcon);
    editButton.setAttribute('data-note-id', note.id);
    buttonsElement.appendChild(editButton);
  });

  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', handleDeleteNote);
  });

  const editButtons = document.querySelectorAll('.edit-button');
  editButtons.forEach((button) => {
    button.addEventListener('click', handleEditNote);
  });
}
let editSubmitHandler = null;
let addSubmitHandler = null;
function handleEditNote(event) {
  const noteId = parseInt(event.target.dataset.noteId);
  const note = notes.find((note) => note.id === noteId);

  if (!note) {
    console.error('Note not found');
    return;
  }

  showAddNoteForm('edit');

  const nameInput = document.querySelector('#name');
  const contentInput = document.querySelector('#content');
  const categoryInput = document.querySelector('#category');

  nameInput.value = note.name;
  contentInput.value = note.content;
  categoryInput.value = note.category;

  const form = document.querySelector('form');

  if (editSubmitHandler || addSubmitHandler) {
    form.removeEventListener('submit', editSubmitHandler);
    form.removeEventListener('submit', addSubmitHandler);
  }

  editSubmitHandler = (event) => {
    handleEditSubmit(event, noteId);
  };
  form.addEventListener('submit', editSubmitHandler);
}

function handleEditSubmit(event, noteId) {
  event.preventDefault();
  console.log('handleEditSubmit');
  const form = event.target;
  const formData = new FormData(form);
  const contentDates =
    formData.get('content').match(/\b\d{1,2}[\.\/]\d{1,2}[\.\/]\d{4}\b/g) || [];

  const editedNote = {
    id: noteId,
    name: formData.get('name'),
    createdAt: formatDate(new Date().toISOString()),
    content: formData.get('content'),
    category: formData.get('category'),
    dates: contentDates,
    archived: false,
  };

  const noteIndex = notes.findIndex((note) => note.id === noteId);
  console.log(noteIndex);
  if (noteIndex !== -1) {
    notes[noteIndex] = editedNote;
    showAddNoteForm();
    form.reset();
    renderNotes();
  }
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

function showAddNoteForm(type) {
  const buttonElement = document.querySelector('.submit-btn');
  const formElement = document.querySelector('.add-form');
  if (type === 'edit') {
    buttonElement.textContent = 'Save';
    console.log('open edit');
  }
  if (type === 'add') {
    if (editSubmitHandler || addSubmitHandler) {
      formElement.removeEventListener('submit', editSubmitHandler);
      formElement.removeEventListener('submit', addSubmitHandler);
    }
    addSubmitHandler = handleFormSubmit;
    formElement.addEventListener('submit', addSubmitHandler);
    formElement.reset();
    buttonElement.textContent = 'Add';
  }
  formElement.removeEventListener('submit', handleEditSubmit);
  if (formElement.classList.contains('show')) {
    formElement.classList.remove('show');
    return;
  }

  formElement.classList.add('show');
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

function handleFormSubmit(event) {
  event.preventDefault();
  console.log('handleFormSubmit');
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
  showAddNoteForm();
  form.reset();
  renderNotes();
}

function handleAddNote() {
  showAddNoteForm('add');
}
