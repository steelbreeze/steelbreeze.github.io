"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function* prepend(element, source) {
    yield element;
    yield* source;
}
exports.prepend = prepend;
