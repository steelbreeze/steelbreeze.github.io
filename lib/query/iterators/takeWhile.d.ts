import { Predicate2 } from '..';
/**
 * Iterate over an iterable object while a condition holds true.
 * @param TSource The type of objects returned when iterating over the source.
 * @param source The iterable object to iterate over.
 * @param predicate The boolean expression that takes an element from the source.
 * @returns Returns the initial items in the source until one caused the predicate to fail.
 */
export declare function takeWhile<TSource>(source: Iterable<TSource>, predicate: Predicate2<TSource, number>): Iterable<TSource>;
