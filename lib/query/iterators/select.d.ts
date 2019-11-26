import { Func2 } from '..';
export declare function select<TSource, TResult>(source: Iterable<TSource>, selector: Func2<TSource, number, TResult>): Iterable<TResult>;
