/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  if (!obj) {
    return undefined;
  }

  const entities = Object.entries(obj);
  const invertedObj = {};

  entities.forEach(([key, value]) => (invertedObj[value] = key));

  return invertedObj;
}
