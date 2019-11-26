import { Func1, IIndex, Predicate2 } from '..';
export declare class groupedIndex<TSource, TKey> implements IIndex<TSource, TKey> {
    readonly groups: Array<{
        key: TKey;
        elements: Array<TSource>;
    }>;
    constructor(source: Iterable<TSource>, keySelector: Func1<TSource, TKey>);
    select<TComparable>(comparable: TComparable, comparer: Predicate2<TComparable, TKey>): Iterable<TSource>;
}
