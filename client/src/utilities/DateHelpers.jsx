export const pad = (n) => (n < 10 ? `0${n}` : `${n}`);

export const toYMD = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export const combineYMDHM = (ymd, hours, minutes) =>
  new Date(`${ymd}T${pad(hours)}:${pad(minutes)}:00`);

export const formatTime = (date) => {
  const d = new Date(date);
  let h = d.getHours();
  const m = pad(d.getMinutes());
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
};

export const overlaps = (startA, endA, startB, endB) =>
  startA < endB && endA > startB;

export const minutesAdd = (date, mins) => new Date(date.getTime() + mins * 60000);

export const generateSlots = (ymd, startHour, endHour, slotMins) => {
  const slots = [];
  let cursor = combineYMDHM(ymd, startHour, 0);
  const end = combineYMDHM(ymd, endHour, 0);

  while (cursor < end) {
    const slotEnd = minutesAdd(cursor, slotMins);
    if (slotEnd <= end) {
      slots.push({ start: new Date(cursor), end: slotEnd });
    }
    cursor = slotEnd;
  }
  return slots;
};

export const normalizeBooked = (booked = []) =>
  booked.map(({ start_time, end_time }) => ({
    start: new Date(start_time),
    end: new Date(end_time),
  }));
