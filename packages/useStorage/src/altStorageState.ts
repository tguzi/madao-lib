import { isFunction } from './utils'

import {
  IFuncUpdater,
  TStorageStateDefaultValue,
  TStorageStateResult
} from './types'

function altStorageState<T>(storage: Storage, key: string, defaultValue?: TStorageStateDefaultValue<T>): TStorageStateResult<T> {

  function getStoredValue() {
    const raw = storage.getItem(key)
    if (raw) {
      try {
        return JSON.parse(raw)
      } catch (e) { }
    }
    if (isFunction<IFuncUpdater<T>>(defaultValue)) {
      return defaultValue()
    }
    return defaultValue
  }

  function updateState(value?: T | IFuncUpdater<T>) {
    if (isFunction<IFuncUpdater<T>>(value)) {
      const previousState = getStoredValue()
      const currentState = value(previousState)
      storage.setItem(key, JSON.stringify(currentState))
    } else {
      storage.setItem(key, JSON.stringify(value))
    }
  }

  function deleteState() {
    storage.removeItem(key)
  }

  const state = getStoredValue()

  return [state, updateState, deleteState]
}

export default altStorageState
