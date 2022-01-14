// Generated with util/create-component.js

import React from 'react';

// Props for the Provider
export interface AstroProvider {
    settings?: AstroConfig;
    children?: any;
}

// The Config a.k.a settings parameter
export interface AstroConfig {
    rounded: boolean;
}

export interface AstroContextValue {
    AstroConfig?: AstroConfig;
    Toast: Toast;
}

// =============================================================================
// TOAST
// =============================================================================
export interface Toast {
    success: (message: string) => void;
    warning: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
    remove: (id: string) => void;
}

export interface ToastWrapperProps {
    children: React.ReactNode;
}

export interface ToastPlaceholderProps {
    toasts: ToastObject[];
}
export interface ToastMessageProps {
    toast: ToastObject;
}

export interface ToastObject {
    message: string;
    type: string;
    id: string;
}

// =============================================================================
// MODAL
// =============================================================================
export interface Modal {
    show: (object: React.FC<any>, props: object) => void;
    hide: (id: string) => void;
}

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
    component: React.FC<any>;
    props: object;
    id: string;
}

export interface IBaseModalProps {
    id: string;
    key: string;
}
