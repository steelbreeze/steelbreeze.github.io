"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function aggregate(source, seed, func) {
    let result = seed;
    for (const element of source) {
        result = func(result, element);
    }
    return result;
}
exports.aggregate = aggregate;
