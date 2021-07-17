import React, { FC } from 'react';
interface IProps {
    [key: string]: any;
}
declare type TProps = Partial<{
    closeModal: () => void;
}> & IProps;
declare const useModal: (Modal: FC<TProps>) => {
    RenderModal: React.FC<IProps>;
    show: () => void;
    hide: () => void;
};
export default useModal;
