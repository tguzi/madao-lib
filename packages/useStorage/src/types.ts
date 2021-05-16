export interface IFuncUpdater<T> {
  (previousState?: T): T;
}

export type TStorageStateDefaultValue<T> = T | IFuncUpdater<T>;

export type TStorageStateResult<T> = [T | undefined, (value: TStorageStateDefaultValue<T>) => void, () => void];
