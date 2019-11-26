"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function* union(source1, source2) {
    yield* source1;
    yield* source2;
}
exports.union = union;
