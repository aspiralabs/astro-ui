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
    component: React.FC<{ id: string; [key: string]: any }>;
    props: { [key: string]: any };
    id: string;
}

export interface ModalMethods {
    show: <Type>(object: React.FC<{ id: string; [key: string]: any }>, props?: Type) => void;
    hide: (id: string) => void;
}
