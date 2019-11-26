"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sum(source) {
    let result = 0;
    for (const element of source) {
        result += element;
    }
    return result;
}
exports.sum = sum;
