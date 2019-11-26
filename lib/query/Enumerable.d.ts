import { Func1, Func2, Predicate1, Predicate2 } from '.';
/**
 * The Enumerable class wraps generators, iterators and aggregators, enabling a fluent API.
 */
export declare class Enumerable<TSource> implements Iterable<TSource> {
    private readonly source;
    constructor(source: Iterable<TSource>);
    [Symbol.iterator](): Iterator<TSource>;
    aggregate<TResult>(seed: TResult, func: Func2<TResult, TSource, TResult>): TResult;
    all(predicate: Predicate1<TSource>): boolean;
    exists(): boolean;
    first(predicate?: Predicate1<TSource>): TSource | undefined;
    last(predicate?: Predicate1<TSource>): TSource | undefined;
    append(element: TSource): Enumerable<TSource>;
    distinct(): Enumerable<TSource>;
    /**
     * Inner join between two collections together by selecting keys in each and comparing.
     * @param rightSource The right source data set.
     * @param leftKeySelector  Function to select the items from the left data set used within the comparer.
     * @param rightKeySelector Function to select the items from the right data set used within the comparer.
     * @param resultSelector Function to select the items from the left and right records that will form the final results data.
     * @param comparer Function to compare the left and right keys to determine of the two items should be joined; defaults to an equallity comparison using Object.is.
     */
    join<TRight, TLeftKey, TRightKey, TResult>(rightSource: Iterable<TRight>, leftKeySelector: Func1<TSource, TLeftKey>, rightKeySelector: Func1<TRight, TRightKey>, resultSelector: Func2<TSource, TRight, TResult>, comparer?: Predicate2<TLeftKey, TRightKey>): Enumerable<TResult>;
    prepend(element: TSource): Enumerable<TSource>;
    select<TResult>(selector: Func2<TSource, number, TResult>): Enumerable<TResult>;
    selectMany<TCollection, TResult>(collectionSelector: Func2<TSource, number, Iterable<TCollection>>, resultSelector: Func2<TSource, TCollection, TResult>): Iterable<TResult>;
    skip(count: number): Enumerable<TSource>;
    skipWhile(predicate: Predicate2<TSource, number>): Enumerable<TSource>;
    toArray(): Array<TSource>;
    take(count: number): Enumerable<TSource>;
    takeWhile(predicate: Predicate2<TSource, number>): Enumerable<TSource>;
    where(predicate: Predicate2<TSource, number>): Enumerable<TSource>;
    union(source: Iterable<TSource>): Enumerable<TSource>;
    static permutations<TSource>(source: Array<TSource>): Enumerable<Iterable<TSource>>;
    static range(start: number, length: number): Enumerable<number>;
}
