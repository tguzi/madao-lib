export interface IFuncUpdater<T> {
    (previousState?: T): T;
}
export declare type TStorageStateDefaultValue<T> = T | IFuncUpdater<T>;
export declare type TStorageStateResult<T> = [T | undefined, (value: TStorageStateDefaultValue<T>) => void, () => void];
