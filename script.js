import { renderSummaryTable } from './summary.js';
import { handleAddNote } from './notes.js';
import { renderNotes } from './notes.js';

export let notes = [
  {
    id: 1,
    name: 'Buy Groceries',
    createdAt: 'July 27, 2023',
    content: 'Buy fruits and vegetables',
    category: 'Task',
    dates: [],
    archived: false,
  },

  {
    id: 2,
    name: 'Idea for Blog',
    createdAt: 'July 27, 2023',
    content: 'Write about a travel experience',
    category: 'Idea',
    dates: [],
    archived: false,
  },
  {
    id: 3,
    name: 'Project',
    createdAt: 'July 26, 2023',
    content: 'Project discussion',
    category: 'Task',
    dates: [],
    archived: false,
  },
  {
    id: 4,
    name: 'Project',
    createdAt: 'July 27, 2023',
    content: 'Start a new project',
    category: 'Task',
    dates: [],
    archived: false,
  },
  {
    id: 5,
    name: 'Books',
    createdAt: 'July 27, 2023',
    content: 'Buy book',
    category: 'Random Thought',
    dates: [],
    archived: false,
  },
  {
    id: 6,
    name: 'Write Blog Post',
    createdAt: 'July 24, 2023',
    content: 'Topic: JavaScript Best Practices',
    category: 'Idea',
    dates: [],
    Archived: false,
  },

  {
    id: 7,
    name: 'Project Meeting',
    createdAt: 'July 26, 2023',
    content: 'Discuss project strategy',
    category: 'Task',
    dates: [],
    archived: false,
  },
];

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

document.addEventListener('DOMContentLoaded', () => {
  renderNotes();
  renderSummaryTable();
  const archiveToggle = document.querySelector('#archiveToggle');
  archiveToggle.addEventListener('click', toggleArchivedNotes);

  const addButton = document.querySelector('#addButton');
  addButton.addEventListener('click', handleAddNote);
});
