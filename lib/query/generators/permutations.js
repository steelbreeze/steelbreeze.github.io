"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
function permutations(source) {
    return source.length === 1 ? [source] : __1.selectMany(source, (exclude, excludeIndex) => permutations(__1.toArray(__1.where(source, (element, elementIndex) => elementIndex !== excludeIndex))), (excluded, permutation) => [excluded, ...permutation]);
}
exports.permutations = permutations;
