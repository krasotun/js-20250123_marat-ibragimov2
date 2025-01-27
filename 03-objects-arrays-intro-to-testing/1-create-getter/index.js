/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const props = path.split(".");

  const getter = (obj) => {
    let value = obj;

    for (const prop of props) {
      if (value[prop] === undefined || typeof value[prop] === "function") {
        return undefined;
      }

      if (value[prop] === null) {
        return null;
      }

      value = value[prop];
    }

    return value;
  };

  return getter;
}
