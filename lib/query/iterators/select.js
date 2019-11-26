"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function* select(source, selector) {
    let index = 0;
    for (const element of source) {
        yield selector(element, index++);
    }
}
exports.select = select;
