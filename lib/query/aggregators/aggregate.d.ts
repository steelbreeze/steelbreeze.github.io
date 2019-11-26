import { Func2 } from '..';
export declare function aggregate<TSource, TResult>(source: Iterable<TSource>, seed: TResult, func: Func2<TResult, TSource, TResult>): TResult;
