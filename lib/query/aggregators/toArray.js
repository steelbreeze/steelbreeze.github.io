"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Converts an iterable object into an array.
 * @param TSource The type of the elements in the source iterable object and resultant array.
 * @param source An iterable object.
 * @return Returns an array of elements produced by iterating over the source object.
 */
function toArray(source) {
    return [...source];
}
exports.toArray = toArray;
