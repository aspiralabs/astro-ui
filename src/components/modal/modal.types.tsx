import { ReactElement, ReactNode } from 'react';

export interface BaseModalProps {
    id: string;
}
export interface ModalWrapperProps {
    children: React.ReactNode;
}

export interface ModalPlaceholderProps {
    modals: ModalObject[];
}

export interface ModalObject {
    component: React.ComponentType;
    props: object;
    id: string;
}

export interface ModalMethods {
    show: (object: React.ComponentType, props: object) => void;
    hide: (id: string) => void;
}
