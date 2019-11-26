"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function* skipWhile(source, predicate) {
    let yielding = false;
    let index = 0;
    for (const element of source) {
        if (yielding || (yielding = !predicate(element, index++))) {
            yield element;
        }
    }
}
exports.skipWhile = skipWhile;
