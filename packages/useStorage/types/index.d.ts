import useStorageState from './useStorageState';
import altStorageState from './altStorageState';
export declare function useLocalStorageState<T>(key: string, defaultValue?: T | (() => T)): import("./types").TStorageStateResult<T>;
export declare function altLocalStorageState<T>(key: string, defaultValue?: T | (() => T)): import("./types").TStorageStateResult<T>;
export declare function useSessionStorageState<T>(key: string, defaultValue?: T | (() => T)): import("./types").TStorageStateResult<T>;
export declare function altSessionStorageState<T>(key: string, defaultValue?: T | (() => T)): import("./types").TStorageStateResult<T>;
export declare function usecacheStorageState<T>(key: string, defaultValue?: T | (() => T)): import("./types").TStorageStateResult<T>;
export declare function altCacheStorageState<T>(key: string, defaultValue?: T | (() => T)): import("./types").TStorageStateResult<T>;
declare const _default: {
    useStorageState: typeof useStorageState;
    altStorageState: typeof altStorageState;
};
export default _default;
