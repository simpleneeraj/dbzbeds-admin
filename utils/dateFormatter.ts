export const dateFormatter = (date: string) => {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("default", { month: "short" });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const time = dateObj.toLocaleTimeString("en-US");
  return `${day} ${month} ${year} at ${time}`;
};
