"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function* append(source, element) {
    yield* source;
    yield element;
}
exports.append = append;
