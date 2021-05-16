import { TStorageStateDefaultValue, TStorageStateResult } from './types';
declare function useStorageState<T>(storage: Storage, key: string, defaultValue?: TStorageStateDefaultValue<T>): TStorageStateResult<T>;
export default useStorageState;
