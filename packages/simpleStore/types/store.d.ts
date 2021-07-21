import React from 'react';
declare type Payload<D> = {
    [P in keyof D]?: D[P];
};
export declare type IDispatch<D> = (type: string, payload: Payload<D>) => void;
interface IStore<S, D> {
    state: S;
    reducers: IReducer<S, D>;
    effects: IEffect<D>;
}
interface IReducer<S, D> {
    [key: string]: (state: S, data?: Payload<D>) => S;
}
interface IEffect<D> {
    [key: string]: (data?: Payload<D>, dispatch?: IDispatch<D>) => void;
}
interface IContextWidthDispatch<D> {
    dispatch: IDispatch<D>;
}
interface IContext<S> {
    [key: string]: S;
}
declare const Store: <S, D>(namespace: string, props: IStore<S, D>) => {
    Provider: React.FC<{}>;
    Context: React.Context<IContext<S> | IContextWidthDispatch<D> | null>;
    connect: (Component: any) => (props: any) => JSX.Element;
};
export default Store;
