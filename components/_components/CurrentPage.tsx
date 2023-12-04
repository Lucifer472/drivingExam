const currentPage = (pageNumberString: string) => {
  const number = parseInt(pageNumberString);
  if (Number.isInteger(number)) return number;
  return 1;
};
export default currentPage;
