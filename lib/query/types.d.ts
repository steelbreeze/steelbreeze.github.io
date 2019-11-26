export declare type Func1<TArg1, TResult> = (arg1: TArg1) => TResult;
export declare type Func2<TArg1, TArg2, TResult> = (arg1: TArg1, arg2: TArg2) => TResult;
export declare type Predicate1<TArg1> = Func1<TArg1, boolean>;
export declare type Predicate2<TArg1, TArg2> = Func2<TArg1, TArg2, boolean>;
export declare type Span<TValue> = {
    from: TValue | undefined;
    to: TValue | undefined;
};
