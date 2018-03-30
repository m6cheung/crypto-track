export const convertToCurrency = (str) => {
  return parseFloat(str.split(",").join("")).toFixed(2);
}