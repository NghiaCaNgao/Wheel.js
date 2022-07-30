/**
 * Returns a unique id, sequentially generated from a global variable.
 * @returns {number}
 * @function
 */
export const uid = (function () {
    let id = 0;
    return function () {
        return id++;
    };
}());