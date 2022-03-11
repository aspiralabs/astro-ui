import { ReactElement, ReactNode } from 'react';
import { TestModalProps } from './demo_modal';

export interface BaseModalProps {
    id?: string;
}
export interface ModalWrapperProps {
    children: React.ReactNode;
}

export interface ModalPlaceholderProps {
    modals: ModalObject[];
}

export interface ModalObject {
    component: React.FC<any>;
    props: { [key: string]: any };
    id: string;
}

export interface ModalMethods {
    show: <Type>(object: React.FC<Type>, props?: Type) => void;
    hide: (id: string) => void;
}
