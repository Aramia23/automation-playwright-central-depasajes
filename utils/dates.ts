async function getTodayDateDay() {
  const today = new Date();
  const dayNumber = today.getDate().toString();
  return dayNumber;
}

async function getTomorrowDateDay() {
  const today = new Date();
  const returnDate = new Date(today);
  returnDate.setDate(today.getDate() + 1);
  const returnDay = returnDate.getDate().toString();
  return returnDay;
}

export { getTodayDateDay, getTomorrowDateDay };
