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
      if (!value?.hasOwnProperty(prop)) {
        return;
      }

      value = value[prop];
    }

    return value;
  };

  return getter;
}
