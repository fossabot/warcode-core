/**
 * @return copy of array, with replaced elements
 */
export default function(array, replacementMap) {
  return Object.assign([], array, replacementMap);
}
