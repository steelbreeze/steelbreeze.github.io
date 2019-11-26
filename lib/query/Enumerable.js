"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
/**
 * The Enumerable class wraps generators, iterators and aggregators, enabling a fluent API.
 */
class Enumerable {
    constructor(source) {
        this.source = source;
    }
    [Symbol.iterator]() {
        return this.source[Symbol.iterator]();
    }
    aggregate(seed, func) {
        return _1.aggregate(this, seed, func);
    }
    all(predicate) {
        return _1.all(this, predicate);
    }
    exists() {
        return _1.exists(this);
    }
    first(predicate = _1.True) {
        return _1.first(this, predicate);
    }
    last(predicate = _1.True) {
        return _1.last(this, predicate);
    }
    append(element) {
        return new Enumerable(_1.append(this, element));
    }
    distinct() {
        return new Enumerable(_1.distinct(this));
    }
    /**
     * Inner join between two collections together by selecting keys in each and comparing.
     * @param rightSource The right source data set.
     * @param leftKeySelector  Function to select the items from the left data set used within the comparer.
     * @param rightKeySelector Function to select the items from the right data set used within the comparer.
     * @param resultSelector Function to select the items from the left and right records that will form the final results data.
     * @param comparer Function to compare the left and right keys to determine of the two items should be joined; defaults to an equallity comparison using Object.is.
     */
    join(rightSource, leftKeySelector, rightKeySelector, resultSelector, comparer = _1.EquallityComparer) {
        return new Enumerable(_1.join(this, rightSource, leftKeySelector, rightKeySelector, resultSelector, comparer));
    }
    prepend(element) {
        return new Enumerable(_1.prepend(element, this));
    }
    select(selector) {
        return new Enumerable(_1.select(this, selector));
    }
    selectMany(collectionSelector, resultSelector) {
        return new Enumerable(_1.selectMany(this, collectionSelector, resultSelector));
    }
    skip(count) {
        return new Enumerable(_1.skip(this, count));
    }
    skipWhile(predicate) {
        return new Enumerable(_1.skipWhile(this, predicate));
    }
    toArray() {
        return _1.toArray(this);
    }
    take(count) {
        return new Enumerable(_1.take(this, count));
    }
    takeWhile(predicate) {
        return new Enumerable(_1.takeWhile(this, predicate));
    }
    where(predicate) {
        return new Enumerable(_1.where(this, predicate));
    }
    union(source) {
        return new Enumerable(_1.union(this, source));
    }
    static permutations(source) {
        return new Enumerable(_1.permutations(source));
    }
    static range(start, length) {
        return new Enumerable(_1.range(start, length));
    }
}
exports.Enumerable = Enumerable;
