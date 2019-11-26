"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns an array of unique items within the source.
 * @param TSource The type of elements within the source.
 * @param source The object to iterate over.
 */
function* distinct(source) {
    const set = [];
    for (const element of source) {
        if (set.indexOf(element) === -1) {
            set.push(element);
            yield element;
        }
    }
}
exports.distinct = distinct;
function distinctA(source) {
    const set = [];
    for (const element of source) {
        if (set.indexOf(element) === -1) {
            set.push(element);
        }
    }
    return set;
}
exports.distinctA = distinctA;
