"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function* skip(source, count) {
    for (const element of source) {
        if (count === 0) {
            yield element;
        }
        else {
            --count;
        }
    }
}
exports.skip = skip;
