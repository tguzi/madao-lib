import React from 'react';
export declare type IDispatch<D> = (type: string, payload?: TPayload<D> | D) => void;
export declare type TPayload<D> = {
    [P in keyof D]?: D[P];
};
export interface IAction<D> {
    type: string;
    payload?: TPayload<D>;
}
export interface IReducer<S, D> {
    [key: string]: (state: S, data?: TPayload<D>) => S;
}
export interface IEffect<D> {
    [key: string]: (data?: TPayload<D>, dispatch?: IDispatch<D>) => void;
}
export declare type TContextWidthDispatch<S, D> = {
    dispatch: IDispatch<D>;
    [key: string]: S | IDispatch<D>;
};
interface IProps<S, D> {
    Context: React.Context<TContextWidthDispatch<S, D> | null>;
    namespace: string;
    state: S;
    reducers: IReducer<S, D>;
    effects: IEffect<D>;
}
declare function storeWrapper<S, D>({ Context, namespace, state, reducers, effects, }: IProps<S, D>): [React.FC<any>, any];
export default storeWrapper;
