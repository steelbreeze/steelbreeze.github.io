"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function exists(source) {
    return !source[Symbol.iterator]().next().done;
}
exports.exists = exists;
