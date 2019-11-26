"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
class groupedIndex {
    constructor(source, keySelector) {
        this.groups = [];
        for (const element of source) {
            const key = keySelector(element);
            const group = __1.first(this.groups, group => __1.EquallityComparer(key, group.key));
            if (group) {
                group.elements.push(element);
            }
            else {
                this.groups.push({ key: key, elements: [element] });
            }
        }
    }
    *select(comparable, comparer) {
        const query = __1.where(this.groups, group => comparer(comparable, group.key));
        for (const group of comparer === __1.EquallityComparer ? __1.take(query, 1) : query) {
            for (const element of group.elements) {
                yield element;
            }
        }
    }
}
exports.groupedIndex = groupedIndex;
