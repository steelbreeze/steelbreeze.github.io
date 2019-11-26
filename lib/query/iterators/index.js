"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Iterators apply an operation to an iterable object, returning another iterable object.
 */
var distinct_1 = require("./distinct");
exports.distinct = distinct_1.distinct;
exports.distinctA = distinct_1.distinctA;
var select_1 = require("./select");
exports.select = select_1.select;
var selectMany_1 = require("./selectMany");
exports.selectMany = selectMany_1.selectMany;
var skip_1 = require("./skip");
exports.skip = skip_1.skip;
var skipWhile_1 = require("./skipWhile");
exports.skipWhile = skipWhile_1.skipWhile;
var take_1 = require("./take");
exports.take = take_1.take;
var takeWhile_1 = require("./takeWhile");
exports.takeWhile = takeWhile_1.takeWhile;
var where_1 = require("./where");
exports.where = where_1.where;
/*
export function* zip<TSource>(source1: Iterable<TSource>, source2: Iterable<TSource>): IterableIterator<TSource> {
    let i1 = source1[Symbol.iterator]();
    let i2 = source2[Symbol.iterator]();
    let r1: IteratorResult<TSource>;
    let r2: IteratorResult<TSource>;

    while (!(r1 = i1.next()).done && !(r2 = i2.next()).done) {
        yield r1.value;
        yield r2.value;
    }
}

*/ 
