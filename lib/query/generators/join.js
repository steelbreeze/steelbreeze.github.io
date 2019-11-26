"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const groupedIndex_1 = require("./groupedIndex");
/**
 * Inner join between two collections together by selecting keys in each and comparing.
 * @param leftSource The left source data set.
 * @param rightSource The right source data set.
 * @param leftKeySelector  Function to select the items from the left data set used within the comparer.
 * @param rightKeySelector Function to select the items from the right data set used within the comparer.
 * @param resultSelector Function to select the items from the left and right records that will form the final results data.
 * @param comparer Function to compare the left and right keys to determine of the two items should be joined; defaults to an equallity comparison using Object.is.
 * @param rightIndex An optional index used to speed up the join.
 */
function* join(leftSource, rightSource, leftKeySelector, rightKeySelector, resultSelector, comparer = __1.EquallityComparer, rightIndex = undefined) {
    // create a temporary index if one is not supplied
    const index = rightIndex || new groupedIndex_1.groupedIndex(rightSource, rightKeySelector);
    // iterate through the left source
    for (const leftElement of leftSource) {
        for (const rightElement of index.select(leftKeySelector(leftElement), comparer)) {
            yield resultSelector(leftElement, rightElement);
        }
    }
}
exports.join = join;
