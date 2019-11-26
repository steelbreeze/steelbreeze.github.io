/**
 * Returns an array of unique items within the source.
 * @param TSource The type of elements within the source.
 * @param source The object to iterate over.
 */
export declare function distinct<TSource>(source: Iterable<TSource>): Iterable<TSource>;
export declare function distinctA<TSource>(source: Iterable<TSource>): Array<TSource>;
