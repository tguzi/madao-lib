import React, { FC, useReducer, useContext, useCallback } from 'react'

export type IDispatch<D> = (type: string, payload?: TPayload<D> | D) => void

export type TPayload<D> = {
  [P in keyof D]?: D[P];
}

export interface IAction<D> {
  type: string // action名
  payload?: TPayload<D>
}

// reducer方法
export interface IReducer<S, D> {
  [key: string]: (state: S, data?: TPayload<D>) => S
}

// effects方法
export interface IEffect<D> {
  [key: string]: (data?: TPayload<D>, dispatch?: IDispatch<D>) => void
}

export type TContextWidthDispatch<S, D> = {
  dispatch: IDispatch<D>
  [key: string]: S | IDispatch<D>
}

interface IProps<S, D> {
  Context: React.Context<TContextWidthDispatch<S, D> | null>
  namespace: string
  state: S
  reducers: IReducer<S, D>
  effects: IEffect<D>
}

// { [x: string]: S | IDispatch<D>; dispatch: IDispatch<D>; }

function storeWrapper<S, D>({
  Context,
  namespace,
  state,
  reducers,
  effects,
}: IProps<S, D>): [React.FC<any>, any] {
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
    return <Context.Provider value={{ [namespace]: providerState, dispatch: _dispatch }}> {children} </Context.Provider>
  }
  const connect = (Component: any) => {
    const NewComponent = (props: any): JSX.Element => {
      const context: any = useContext(Context)
      const newProps = { ...props, ...context }
      return <Component {...newProps} />
    }
    return NewComponent
  }
  return [Provider, connect]
}

export default storeWrapper
