"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function all(source, predicate) {
    for (const element of source) {
        if (!predicate(element)) {
            return false;
        }
    }
    return true;
}
exports.all = all;
