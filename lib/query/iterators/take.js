"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function* take(source, count) {
    for (const element of source) {
        if (count-- === 0) {
            break;
        }
        yield element;
    }
}
exports.take = take;
