"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function* where(source, predicate) {
    let index = 0;
    for (const element of source) {
        if (predicate(element, index++)) {
            yield element;
        }
    }
}
exports.where = where;
