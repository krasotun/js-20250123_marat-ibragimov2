/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = "asc") {
  const ascComparator = (a, b) => a.localeCompare(b);

  const descComparator = (a, b) => b.localeCompare(a);

  const upperCaseComparator = (a, b) => {
    if (a.toLowerCase() !== b.toLowerCase()) {
      return 0;
    }

    if (a[0].toUpperCase() === a[0]) {
      return -1;
    }

    if (b[0].toUpperCase() === b[0]) {
      return 1;
    }
  };

  return [...arr]
    .sort(param === "asc" ? ascComparator : descComparator)
    .sort(upperCaseComparator);
}
