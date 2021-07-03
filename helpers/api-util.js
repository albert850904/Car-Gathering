export async function getAllEvents() {
  const result = await fetch(
    "https://next-js-lesson-default-rtdb.firebaseio.com/events.json"
  );
  const data = await result.json();
  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}
// note: 取得所有page 再來拉出id 來pregen event detail page 並非好作法
// 可以prefetch featured 或是 置頂event 即可
export async function getFeaturedEvents() {
  const res = await getAllEvents();
  return res.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const res = await getAllEvents();
  return res.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const res = await getAllEvents();
  let filteredEvents = res.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
