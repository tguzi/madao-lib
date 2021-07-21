import React, { FC, createContext, useReducer, useContext, useCallback, Component } from 'react'

type Payload<D> = {
  [P in keyof D]?: D[P];
}

// dispatch
export type IDispatch<D> = (type: string, payload: Payload<D>) => void

// 状态库入参 泛型入参
interface IStore<S, D> {
  state: S
  reducers: IReducer<S, D>,
  effects: IEffect<D>
}

// reducer方法
interface IReducer<S, D> {
  [key: string]: (state: S, data?: Payload<D>) => S
}

// effects方法
interface IEffect<D> {
  [key: string]: (data?: Payload<D>, dispatch?: IDispatch<D>) => void
}

interface IAction<D> {
  type: string // action名
  payload: Payload<D>
}

interface IContextWidthDispatch<D> {
  dispatch: IDispatch<D>
}

interface IContext<S> {
  [key: string]: S
}

const Store = <S, D>(namespace: string, props: IStore<S, D>) => {
  const { state, reducers, effects } = props

  const Context = createContext<IContext<S> | IContextWidthDispatch<D> | null>(null)

  const Provider: FC = ({ children }) => {
    const [providerState, dispatch] = useReducer((state: S, action: IAction<D>) => {
      const { type, payload } = action
      if (reducers && reducers.hasOwnProperty(type)) {
        // 自己包装的reducers
        return reducers[type](state, payload)
      }
      return state
    }, state)

    // effect中的dispatch
    const effectDispatch: IDispatch<D> = (type, payload) => {
      dispatch({ type, payload })
    }

    // 包装dispatch
    const _dispatch = useCallback<IDispatch<D>>((type, payload) => {
      if (effects && effects.hasOwnProperty(type)) {
        effects[type].call(null, payload, effectDispatch)
      } else if (reducers && reducers.hasOwnProperty(type)) {
        dispatch({ type, payload })
      }
    }, [])

    return <Context.Provider value={{ [namespace]: providerState, dispatch: _dispatch }}>{children}</Context.Provider>
  }

  const connect = (Component: any) => {
    const NewComponent = (props: any) => {
      const context = useContext(Context)
      const newProps = { ...props, ...context }
      return <Component {...newProps} />
    }
    return NewComponent
  }

  // 返回值
  return {
    Provider,
    Context,
    connect,
  }
}

export default Store
