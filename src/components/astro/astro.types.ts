// Generated with util/create-component.js

import React from 'react';
import { ModalMethods } from '../modal/modal.types';
import { ToastMethods } from '../toast/toast';

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
    Toast: ToastMethods;
    Modal: ModalMethods;
    test: string;
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
