import { Predicate2 } from './types';
export interface IIndex<TSource, TKey> {
    select<TComparable>(comparable: TComparable, comparer: Predicate2<TComparable, TKey>): Iterable<TSource>;
}
