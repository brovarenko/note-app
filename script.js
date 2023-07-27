const categoryIcons = {
  Task: 'images/task.png',
  'Random Thought': 'images/random.png',
  Idea: 'images/idea.png',
};
let editSubmitHandler = null;
let addSubmitHandler = null;
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
  const archivedNotesContainer = document.querySelector('.archived-notes');
  archivedNotesContainer.innerHTML = '';

  notes.forEach((note) => {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    const nameContainerElement = document.createElement('div');
    const nameElement = document.createElement('div');
    nameElement.textContent = note.name;
    noteElement.appendChild(nameElement);
    const iconElement = document.createElement('img');
    iconElement.src = categoryIcons[note.category];

    iconElement.classList.add('category-icon');
    nameContainerElement.appendChild(iconElement);
    nameContainerElement.appendChild(nameElement);
    noteElement.appendChild(nameContainerElement);

    const createdAtElement = document.createElement('div');
    createdAtElement.textContent = note.createdAt;
    noteElement.appendChild(createdAtElement);
    const categoryElement = document.createElement('div');
    categoryElement.textContent = note.category;
    noteElement.appendChild(categoryElement);
    const contentElement = document.createElement('div');
    contentElement.textContent = note.content;
    noteElement.appendChild(contentElement);

    const mentionedDatesElement = document.createElement('div');
    mentionedDatesElement.textContent = note.dates.join(', ');
    noteElement.appendChild(mentionedDatesElement);

    if (note.archived) {
      archivedNotesContainer.appendChild(noteElement);
    } else {
      notesContainer.appendChild(noteElement);
    }
    const buttonsElement = document.createElement('div');
    noteElement.appendChild(buttonsElement);
    buttonsElement.classList.add('buttons-group');

    const editIcon = document.createElement('i');
    editIcon.classList.add('fa-solid', 'fa-pencil', 'edit-button');
    editIcon.setAttribute('data-note-id', note.id);
    buttonsElement.appendChild(editIcon);

    const archiveIcon = document.createElement('i');
    archiveIcon.classList.add('fa-solid', 'fa-box-archive', 'archive-button');
    archiveIcon.setAttribute('data-note-id', note.id);
    buttonsElement.appendChild(archiveIcon);

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('delete-button', 'fa-solid', 'fa-trash');
    deleteIcon.setAttribute('data-note-id', note.id);
    buttonsElement.appendChild(deleteIcon);

    archiveIcon.style.color = note.archived ? 'green' : '';
  });

  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', handleDeleteNote);
  });

  const editButtons = document.querySelectorAll('.edit-button');
  editButtons.forEach((button) => {
    button.addEventListener('click', handleEditNote);
  });

  const archiveButtons = document.querySelectorAll('.archive-button');
  archiveButtons.forEach((button) => {
    button.addEventListener('click', handleArchiveNote);
  });
}

function handleArchiveNote(event) {
  const noteId = parseInt(event.target.dataset.noteId);
  const note = notes.find((note) => note.id === noteId);

  if (!note) {
    console.error('Note not found');
    return;
  }

  note.archived = !note.archived;

  renderNotes();
}
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
  const archiveToggle = document.querySelector('#archiveToggle');
  archiveToggle.addEventListener('click', toggleArchivedNotes);

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

function toggleArchivedNotes() {
  const activeNotesContainer = document.querySelector('.notes-table');
  const archivedNotesContainer = document.querySelector('.archived-notes');
  const archiveToggle = document.querySelector('#archiveToggle');
  const addButton = document.querySelector('#addButton');

  if (activeNotesContainer.classList.contains('hidden')) {
    activeNotesContainer.classList.remove('hidden');
    archivedNotesContainer.classList.add('hidden');
    archiveToggle.textContent = 'Show Archived Notes';
    addButton.style.display = 'block';
  } else {
    activeNotesContainer.classList.add('hidden');
    archivedNotesContainer.classList.remove('hidden');
    archiveToggle.textContent = 'Show Active Notes';
    addButton.style.display = 'none';
  }
}
