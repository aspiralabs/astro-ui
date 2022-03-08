// Generated with util/create-component.js

import React from 'react';
import { ModalMethods } from '../modal/modal.types';
import { ToastMethods } from '../toast/toast.types';

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
