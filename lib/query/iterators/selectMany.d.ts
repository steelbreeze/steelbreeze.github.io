import { Func2 } from '..';
export declare function selectMany<TSource, TCollection, TResult>(source: Iterable<TSource>, collectionSelector: Func2<TSource, number, Iterable<TCollection>>, resultSelector: Func2<TSource, TCollection, TResult>): Iterable<TResult>;
