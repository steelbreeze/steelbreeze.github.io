"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Iterate over an iterable object while a condition holds true.
 * @param TSource The type of objects returned when iterating over the source.
 * @param source The iterable object to iterate over.
 * @param predicate The boolean expression that takes an element from the source.
 * @returns Returns the initial items in the source until one caused the predicate to fail.
 */
function* takeWhile(source, predicate) {
    let index = 0;
    for (const element of source) {
        if (predicate(element, index++)) {
            yield element;
        }
        else {
            break;
        }
    }
}
exports.takeWhile = takeWhile;
