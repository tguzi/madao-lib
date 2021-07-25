import { createContext, useContext } from 'react'
import storeWrapper, { IDispatch, IEffect, IReducer, TContextWidthDispatch } from './store'

// 状态库入参 泛型入参
export interface IStore<S, D> {
  state: S
  reducers: IReducer<S, D>,
  effects: IEffect<D>
}

const Store = <S, D>(namespace: string, props: IStore<S, D>) => {
  const { state, reducers, effects } = props
  const Context = createContext<TContextWidthDispatch<S, D> | null>(null)
  const [Provider, connect] = storeWrapper<S, D>({ Context, namespace, state, reducers, effects })
  function useSimpleContext(): [S, IDispatch<D>] {
    const context = useContext<TContextWidthDispatch<S, D> | null>(Context)
    const nextState = context ? (context[namespace] as S) : state
    return [nextState, (context?.dispatch as IDispatch<D>)]
  }
  // 返回值
  return {
    Provider,
    Context,
    connect,
    useSimpleContext,
  }
}

export { IDispatch, IEffect, IReducer, TContextWidthDispatch }

export default Store
