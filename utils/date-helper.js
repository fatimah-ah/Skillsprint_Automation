function futureDateTimeLocal(daysAhead = 1, hour = 14, minute = 0) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  d.setHours(hour, minute, 0, 0);
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(hour)}:${pad(minute)}`;
}

function pastDateTimeLocal() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  d.setHours(10, 0, 0, 0);
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T10:00`;
}

module.exports = {
  futureDateTimeLocal,
  pastDateTimeLocal
};
