export function getCategoryIconUrl(category) {
  switch (category) {
    case 'Task':
      return 'images/task.png';
    case 'Random Thought':
      return 'images/random.png';
    case 'Idea':
      return 'images/idea.png';
    default:
      return '';
  }
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
