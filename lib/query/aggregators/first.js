"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
function first(source, predicate = __1.True) {
    for (const element of source) {
        if (predicate(element)) {
            return element;
        }
    }
    return;
}
exports.first = first;
