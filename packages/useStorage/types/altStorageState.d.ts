import { TStorageStateDefaultValue, TStorageStateResult } from './types';
declare function altStorageState<T>(storage: Storage, key: string, defaultValue?: TStorageStateDefaultValue<T>): TStorageStateResult<T>;
export default altStorageState;
