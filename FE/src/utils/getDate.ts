export const getOneWeekAgoDate = () => {
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);

  const year = oneWeekAgo.getFullYear();
  const month = String(oneWeekAgo.getMonth() + 1).padStart(2, "0");
  const day = String(oneWeekAgo.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}T00:00:00.000`;
};

export const getToday = () => {
  const today = new Date();
  const oneWeekAgo = new Date(today);

  const year = oneWeekAgo.getFullYear();
  const month = String(oneWeekAgo.getMonth() + 1).padStart(2, "0");
  const day = String(oneWeekAgo.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}T00:00:00.000`;
};
