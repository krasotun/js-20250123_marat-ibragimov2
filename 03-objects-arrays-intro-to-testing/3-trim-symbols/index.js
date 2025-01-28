/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0) {
    return "";
  }

  if (size === undefined) {
    return string;
  }

  const arr = [];
  let dict = {};

  for (const symbol of string) {
    if (!dict[symbol]) {
      dict = {};
      dict[symbol] = 1;
      arr.push(symbol);
    } else {
      dict[symbol] += 1;

      if (dict[symbol] <= size) {
        arr.push(symbol);
      }
    }
  }

  return arr.join("");
}
