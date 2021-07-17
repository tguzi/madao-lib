import React from 'react';
export declare type IDispatch = (type: string, ...args: any) => void;
interface IStore<S, R, E> {
    state: S;
    reducers: any;
    effects: any;
}
interface IContextWidthDispatch {
    dispatch: IDispatch;
}
interface IContext<S> {
    [key: string]: S;
}
declare const Store: <S, R, E>(namespace: string, props: IStore<S, R, E>) => {
    Provider: React.FC<{}>;
    Context: React.Context<(IContext<S> & IContextWidthDispatch) | null>;
    connect: (Component: any) => (props: any) => JSX.Element;
};
export default Store;
