# `@tgu/simpleStore`

> 让react的状态管理更简单

## Usage
<code>import simpleStore from '@tgu/simpleStore'</code>

```js

const { Provider, Context, connect } = simpleStore(namespace, { state, effects, reducers })

/**
 * namespace 给状态加命名空间
 * state 状态
 * reducers 接收旧的 state 和 action，返回新的 state
 * effects reducers的副作用方法，用于一些异步或者复杂reducer函数包装（只是包装，实际修改状态还需要用dispatch来触发reducer）
 * 
 * Provider 跨组件状态共享，用来包裹组件
 * Context context状态对象
 * connect 高阶函数，注入context中的状态
 * 
 * /

```


## Example

```js
// index.tsx
import simpleStore from '@tgu/simpleStore'

/**
 * Provider 跨组件状态共享
 * Context  context 对象
 * _dispatch dispatch 方法
 */
const { Provider, Context, useSimpleContext } = simpleStore('namespace', {
  // 命名空间下的所有状态
  state: {
    testState: 'test'
  },
  // 副作用 - 处理一些异步等场景
  effects: {
    /*
     * data 调用副作用方法的入参
     * dispatch 触发状态修改的
     */
    async changeState(data: any, dispatch) {
      console.log(data)
      dispatch('put', { testState: 'changeState', custom: data })
    },
  },
  // reducer聚合 - 以方法等方式调用
  reducers: {
    /**
     * 修改状态
     * @param {IState} state
     * @param {*} data
     * @returns
     */
    put(state: IState, data: any) {
      return { ...state, ...data }
    },
  },
})

// 简单包装了一下的useContext
export function useSimpleContext(): [IState, IDispatch] {
  const context = useContext(Context)
  return [{ ...context.namespace }, context.dispatch]
}

// render
<Provider>
  <Index />
</Provider>

```

```js
// index.tsx
import React from 'react'
import { useSimpleContext } from 'store'
const Index = () => {
  const [state, dispatch] = useSimpleContext()
  function testDispatch() {
    dispatch('changeState', {
      testState: '222',
    })
  }

  return (
    <div onClick={testDispatch}>
      {state.testState}
    </div>
  )
}
export default Index
```
