# `@tgu/useStorage`
本地数据缓存

```js
import { useStorageState } from '@tgu/usestorage'
```

## Example
```jsx
import { useSessionStorageState } from '@tgu/usestorage'
const [userInfo, setUserInfo] = useSessionStorageState<any>('userInfo', {})
setUserInfo({ userId: 1 })
consle.log('userInfo: ', userInfo)
```

## useStorage

useStorage是前端缓存库 - 可以使用localstorage/sessionstorage,也可以使用自定义的cacheStorage

### Usage
<code>const [state, updateStateFn, deleteStateFn] = useStorageState([cacheStorage], key, defaultValue)</code>

### Params
| Property | Description | Type | Default | Required |
| ---- | ---- | ---- | ---- | ---- |
| cacheStorage | 缓存类库 | Storage | null | true |
| key | 缓存字段名 | string | null | true |
| defaultValue | 默认参数 | any | null | false |

### Result
| Property | Description | Type | Required |
| ---- | ---- | ---- | ---- |
| state | 状态 | any | true |
| updateState | 更新状态的方法 | function | false |
| deleteState | 删除状态的方法 | function | false |

### Storage

自己封装的cacheStorage必须要带有一下方法


| API | Description | Params |
| ---- | ---- | ---- |
| getItem | 获取缓存方法 | key |
| setItem | 设置缓存方法 | key, value |
| removeItem | 移除缓存方法 | key |
| clear | 清除所有缓存方法 | null |
| updateLength | 更新缓存长度 | null |
| key | 根据设置缓存的索引获取缓存key | index |

*******
## altStorageState

altStorageState 的使用方法与 useStorageState 完全一致，唯一的区别在于 useStorageState是以react的hooks方式使用，altStorageState是在非hooks版本中使用

## 其它storage

> 以useLocalStorageState为例

### Usage
```jsx
const [state, updateStateFn, deleteStateFn] = useLocalStorageState(key, defaultValue)
```

### Params
| Property | Description | Type | Default | Required |
| ---- | ---- | ---- | ---- | ---- |
| key | 缓存字段名 | string | null | true |
| defaultValue | 默认参数 | any | null | false |

### Result
| Property | Description | Type | Required |
| ---- | ---- | ---- | ---- |
| state | 状态 | any | true |
| updateState | 更新状态的方法 | function | false |
| deleteState | 删除状态的方法 | function | false |

*******
## 其它
还支持的API用法与useLocalStorageState完全一致。唯二区别：

1. alt/use 函数用法/hooks用法
2. [use/alt][StorageType]state, StorageType表示对应的缓存库

| API | Description |
| ---- | ---- |
| useLocalStorageState | hooks使用localstorage缓存 |
| altLocalStorageState | 非hooks使用localstorage缓存 |
| useSessionStorageState | hooks使用sessionstorage缓存 |
| altSessionStorageState | 非hooks使用sessionstorage缓存 |
| usecacheStorageState | hooks使用自定义的map缓存 |
| altCacheStorageState | 非hooks使用自定义的map缓存 |
