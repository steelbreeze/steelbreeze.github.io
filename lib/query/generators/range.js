"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates a sequential set of [length] integers from start as an iterable object.
 * @param start The starting number.
 * @param length The number of items to return.
 * @returns Returns an iterable object that
 */
function* range(start, length, increment = 1) {
    do {
        yield start;
        start += increment;
    } while (--length);
}
exports.range = range;
