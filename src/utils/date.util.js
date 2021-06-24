export const getDaysFromToday = (date) => {
  const todayInSeconds = new Date().getTime() / 1000;
  if (date.seconds) {
    return Math.floor((todayInSeconds - date.seconds) / 86400);
  } else {
    return Math.floor((todayInSeconds - date.getTime() / 1000) / 86400);
  }
};
