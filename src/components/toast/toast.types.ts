import { IconDefinition } from '@fortawesome/fontawesome-common-types';

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
    options: ToastOptions;
}
export interface ToastMethods {
    success: (message: string, options?: ToastOptions) => void;
    warning: (message: string, options?: ToastOptions) => void;
    error: (message: string, options?: ToastOptions) => void;
    info: (message: string, options?: ToastOptions) => void;
    custom: (message: string, options?: ToastOptions) => void;
    remove: any;
}

export interface ToastContextValue {
    Toast: ToastMethods;
}

export interface ToastOptions {
    timeout?: number;
    variant?: string;
    icon?: IconDefinition;
}
