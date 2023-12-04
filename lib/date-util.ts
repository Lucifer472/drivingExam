export const convertDateFormat = (inputDate: Date) => {
  const date = new Date(inputDate); // Convert the input date string to a Date object
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
};
