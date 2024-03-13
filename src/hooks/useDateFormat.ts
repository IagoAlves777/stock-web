function formatDate(date: string): string {
  if (!date) return '';

  const fixedDate = date.replace('0000', '00:00');

  return new Intl.DateTimeFormat('default', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: 'America/Sao_Paulo',
  }).format(new Date(fixedDate));
}

export default formatDate;
