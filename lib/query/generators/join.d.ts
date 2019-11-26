import { Func1, Func2, IIndex, Predicate2 } from '..';
/**
 * Inner join between two collections together by selecting keys in each and comparing.
 * @param leftSource The left source data set.
 * @param rightSource The right source data set.
 * @param leftKeySelector  Function to select the items from the left data set used within the comparer.
 * @param rightKeySelector Function to select the items from the right data set used within the comparer.
 * @param resultSelector Function to select the items from the left and right records that will form the final results data.
 * @param comparer Function to compare the left and right keys to determine of the two items should be joined; defaults to an equallity comparison using Object.is.
 * @param rightIndex An optional index used to speed up the join.
 */
export declare function join<TLeftSource, TRightSource, TLeftKey, TRightKey, TResult>(leftSource: Iterable<TLeftSource>, rightSource: Iterable<TRightSource>, leftKeySelector: Func1<TLeftSource, TLeftKey>, rightKeySelector: Func1<TRightSource, TRightKey>, resultSelector: Func2<TLeftSource, TRightSource, TResult>, comparer?: Predicate2<TLeftKey, TRightKey>, rightIndex?: IIndex<TRightSource, TRightKey> | undefined): Iterable<TResult>;
