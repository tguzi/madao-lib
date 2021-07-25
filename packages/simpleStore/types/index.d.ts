import { IDispatch, IEffect, IReducer, TContextWidthDispatch } from './store';
export interface IStore<S, D> {
    state: S;
    reducers: IReducer<S, D>;
    effects: IEffect<D>;
}
declare const Store: <S, D>(namespace: string, props: IStore<S, D>) => {
    Provider: import("react").FC<any>;
    Context: import("react").Context<TContextWidthDispatch<S, D> | null>;
    connect: any;
    useSimpleContext: () => [S, IDispatch<D>];
};
export { IDispatch, IEffect, IReducer, TContextWidthDispatch };
export default Store;
