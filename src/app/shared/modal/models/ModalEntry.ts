import { ComponentType } from 'react';
import { ModalOptions } from './ModalOptions';


export type ModalEntry = {
    component: ComponentType<any>;
    options?: ModalOptions;
    resolve: (value: any) => void;
};
