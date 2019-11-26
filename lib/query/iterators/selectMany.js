"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function* selectMany(source, collectionSelector, resultSelector) {
    let index = 0;
    for (const element of source) {
        for (const subElement of collectionSelector(element, index++))
            yield resultSelector(element, subElement);
    }
}
exports.selectMany = selectMany;
