"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
function last(source, predicate = __1.True) {
    let result;
    for (const element of source) {
        if (predicate(element)) {
            result = element;
        }
    }
    return result;
}
exports.last = last;
