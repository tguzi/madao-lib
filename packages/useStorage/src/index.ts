/* eslint-disable indent */
import useStorageState from './useStorageState'
import altStorageState from './altStorageState'
import cache from './cacheStorage'

// hooks场景 - 使用localStorage缓存
export function useLocalStorageState<T>(key: string, defaultValue?: T | (() => T)) {
  return useStorageState(localStorage, key, defaultValue)
}
// 非hooks场景 - 使用localStorage缓存
export function altLocalStorageState<T>(key: string, defaultValue?: T | (() => T)) {
  return altStorageState(localStorage, key, defaultValue)
}

// hooks场景 - 使用sessionStorage缓存
export function useSessionStorageState<T>(key: string, defaultValue?: T | (() => T)) {
  return useStorageState(sessionStorage, key, defaultValue)
}
// 非hooks场景 - 使用sessionStorage缓存
export function altSessionStorageState<T>(key: string, defaultValue?: T | (() => T)) {
  return altStorageState(sessionStorage, key, defaultValue)
}

// hooks场景 - 使用自定义缓存[map]
export function usecacheStorageState<T>(key: string, defaultValue?: T | (() => T)) {
  return useStorageState(cache, key, defaultValue)
}
// 非hooks场景 - 使用自定义缓存[map]
export function altCacheStorageState<T>(key: string, defaultValue?: T | (() => T)) {
  return altStorageState(cache, key, defaultValue)
}

// 导出默认的缓存方法
export default {
  useStorageState,
  altStorageState
}
