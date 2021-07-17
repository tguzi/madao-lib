import React, { FC, createContext, useReducer, useContext, useCallback, Component } from 'react'

// dispatch
export type IDispatch = (type: string, ...args: any) => void

// 状态库入参 泛型入参
interface IStore<S, R, E> {
  state: S
  reducers: any
  effects: any
}

// reducer方法
interface IReducer<S, D> {
  [key: string]: (state: S, data?: D) => S
}

// effects方法
interface IEffect<D> {
  [key: string]: (data?: D, dispatch?: IDispatch) => void
}

interface IAction {
  type: string // action名
  [key: string]: any
}

interface IContextWidthDispatch {
  dispatch: IDispatch
}

interface IContext<S> {
  [key: string]: S
}

const Store = <S, R, E>(namespace: string, props: IStore<S, R, E>) => {
  const { state, reducers, effects } = props

  const Context = createContext<IContext<S> & IContextWidthDispatch|null>(null)

  const Provider: FC = ({ children }) => {
    const [providerState, dispatch] = useReducer((state: S, action: IAction) => {
      const { type, ...args } = action
      if (reducers && reducers.hasOwnProperty(type)) {
        // 自己包装的reducers
        return reducers[type](state, args)
      }
      return state
    }, state)

    // 包装dispatch
    const _dispatch = useCallback((type, args) => {
      if (effects && effects.hasOwnProperty(type)) {
        effects[type].call(null, args, dispatch)
      } else if (reducers && reducers.hasOwnProperty(type)) {
        dispatch({ type, ...args })
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
