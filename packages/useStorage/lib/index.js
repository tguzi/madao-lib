/* You can see me: https://github.com/tguzi */
import { useRef, useState, useEffect } from 'react';

function isFunction(obj) {
  return typeof obj === 'function';
}

function useStorageState(storage, key, defaultValue) {
  var isMounted = useRef(false);

  var _a = useState(function () {
    return getStoredValue();
  }),
      state = _a[0],
      setState = _a[1];

  useEffect(function () {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    setState(getStoredValue());
  }, [key]);

  function getStoredValue() {
    var raw = storage.getItem(key);

    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {}
    }

    if (isFunction(defaultValue)) {
      return defaultValue();
    }

    return defaultValue;
  }

  function updateState(value) {
    if (isFunction(value)) {
      var previousState = getStoredValue();
      var currentState = value(previousState);
      storage.setItem(key, JSON.stringify(currentState));
      setState(currentState);
    } else {
      storage.setItem(key, JSON.stringify(value));
      setState(value);
    }
  }

  function deleteState() {
    setState(undefined);
    storage.removeItem(key);
  }

  return [state, updateState, deleteState];
}

function altStorageState(storage, key, defaultValue) {
  function getStoredValue() {
    var raw = storage.getItem(key);

    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {}
    }

    if (isFunction(defaultValue)) {
      return defaultValue();
    }

    return defaultValue;
  }

  function updateState(value) {
    if (isFunction(value)) {
      var previousState = getStoredValue();
      var currentState = value(previousState);
      storage.setItem(key, JSON.stringify(currentState));
    } else {
      storage.setItem(key, JSON.stringify(value));
    }
  }

  function deleteState() {
    storage.removeItem(key);
  }

  var state = getStoredValue();
  return [state, updateState, deleteState];
}

var MapStorage = function () {
  function MapStorage() {
    this.storage = new Map();
    this.length = 0;
  }

  MapStorage.prototype.getItem = function (key) {
    return this.storage.has(key) && this.storage.get(key);
  };

  MapStorage.prototype.setItem = function (key, value) {
    this.storage.set(key, value);
    this.updateLength();
  };

  MapStorage.prototype.removeItem = function (key) {
    this.storage.delete(key);
    this.updateLength();
  };

  MapStorage.prototype.clear = function () {
    this.storage.clear();
    this.updateLength();
  };

  MapStorage.prototype.updateLength = function () {
    this.length = this.storage.size;
  };

  MapStorage.prototype.key = function (index) {
    var keys = this.storage.keys();
    var key = null;

    if (index > this.storage.size) {
      return key;
    }

    for (var i = 0; i < this.storage.size; i++) {
      var result = keys.next();

      if (i === index) {
        key = result.value;
        break;
      }
    }

    return key;
  };

  return MapStorage;
}();

var cache = new MapStorage();

function useLocalStorageState(key, defaultValue) {
  return useStorageState(localStorage, key, defaultValue);
}
function altLocalStorageState(key, defaultValue) {
  return altStorageState(localStorage, key, defaultValue);
}
function useSessionStorageState(key, defaultValue) {
  return useStorageState(sessionStorage, key, defaultValue);
}
function altSessionStorageState(key, defaultValue) {
  return altStorageState(sessionStorage, key, defaultValue);
}
function usecacheStorageState(key, defaultValue) {
  return useStorageState(cache, key, defaultValue);
}
function altCacheStorageState(key, defaultValue) {
  return altStorageState(cache, key, defaultValue);
}
var index = {
  useStorageState: useStorageState,
  altStorageState: altStorageState
};

export default index;
export { altCacheStorageState, altLocalStorageState, altSessionStorageState, useLocalStorageState, useSessionStorageState, usecacheStorageState };
//# sourceMappingURL=index.js.map
