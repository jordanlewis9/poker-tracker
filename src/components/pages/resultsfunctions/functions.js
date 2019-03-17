export const sessionResults = (cashout, buyin) => {
  let cashed = parseInt(cashout);
  let bought = parseInt(buyin);
  return cashed - bought;
};

export const hours = (arr) => {
  return arr.map((array) => {
    return parseInt(array.time);
  });
};
