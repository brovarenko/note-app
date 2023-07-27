import { renderSummaryTable } from './summary.js';
import { handleAddNote } from './notes.js';
import { renderNotes } from './notes.js';

export let notes = [
  {
    id: 1,
    name: 'Books',
    createdAt: 'July 27, 2023',
    content: 'Buy book',
    category: 'Task',
    dates: [],
    archived: false,
  },
  {
    id: 2,
    name: 'Books',
    createdAt: 'July 27, 2023',
    content: 'Buy book 04.04.2020',
    category: 'Task',
    dates: ['04/04/2020'],
    archived: false,
  },
  {
    id: 3,
    name: 'Books',
    createdAt: 'July 27, 2023',
    content: 'Buy book',
    category: 'Task',
    dates: [],
    archived: true,
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
