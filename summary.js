import { notes } from './script.js';

export function renderSummaryTable() {
  const summaryTable = document.querySelector('.summary-table');
  summaryTable.innerHTML = '';

  const categoryCounts = notes.reduce((counts, note) => {
    const category = note.category;
    counts[category] = counts[category] || { active: 0, archived: 0 };
    if (!note.archived) {
      counts[category].active++;
    } else {
      counts[category].archived++;
    }
    return counts;
  }, {});

  for (const category in categoryCounts) {
    const row = document.createElement('div');
    row.classList.add('summary-row');
    const categoryCell = document.createElement('div');
    const activeCell = document.createElement('div');
    const archivedCell = document.createElement('div');

    categoryCell.textContent = category;
    activeCell.textContent = categoryCounts[category].active;
    archivedCell.textContent = categoryCounts[category].archived;

    row.appendChild(categoryCell);
    row.appendChild(activeCell);
    row.appendChild(archivedCell);
    summaryTable.appendChild(row);
  }
}
