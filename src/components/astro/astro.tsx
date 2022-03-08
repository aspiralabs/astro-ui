// Generated with util/create-component.js
import React, { useContext, useEffect, useState } from 'react';
import { uid } from 'uid';
import { ToastPlaceholder } from '../toast/toast';
import { AstroContextValue } from './astro.types';
import { ModalMethods, ModalObject } from '../modal/modal.types';
import { ModalPlaceholder } from '../modal/modal';
import { AnimatePresence } from 'framer-motion/dist/framer-motion';
import { ToastMethods, ToastOptions, ToastObject } from '../toast/toast.types';

// Create the Context
export const AstroContext = React.createContext<AstroContextValue>({} as AstroContextValue);
export const useAstro = () => React.useContext(AstroContext);

// Create the Provider used to wrap app
const AstroProvider = ({ children }) => {
    // =========================================================================
    // STATES
    // =========================================================================
    const [modals, setModals] = useState<ModalObject[]>([]);
    const [toasts, setToasts] = useState<ToastObject[]>([]);

    // =========================================================================
    // TOASTS
    // =========================================================================
    const Toast: ToastMethods = {
        success: (message, options) => addToast(message, 'success', options),
        warning: (message, options) => addToast(message, 'warning', options),
        error: (message, options) => addToast(message, 'error', options),
        info: (message, options) => addToast(message, 'info', options),
        custom: (message, options) => addToast(message, 'custom', options),
        remove: id => removeToast(id),
    };

    // GENERAL ADD TOAST METHOD
    const addToast = React.useCallback(
        (message: string, type: string, options: ToastOptions) => {
            const newToastObject: ToastObject = {
                message,
                type,
                id: uid(),
                options,
            };

            setToasts(toasts => [...toasts, newToastObject]);
        },
        [setToasts],
    );

    // GENERAL REMOVE TOAST METHOD
    const removeToast = React.useCallback(
        (id: string) => setToasts(toasts => toasts.filter(toast => toast.id !== id)),
        [toasts],
    );

    // =========================================================================
    // MODALS
    // =========================================================================
    const Modal: ModalMethods = {
        show: (object, props) => {
            addModal({
                component: object,
                props,
                id: uid(),
            });
        },
        hide: id => removeModal(id),
    };

    // Add Modal Method
    const addModal = React.useCallback(
        (newModals: ModalObject) => {
            setModals(modals => [newModals, ...modals]);
        },
        [setModals],
    );

    // Remove Modal Method
    const removeModal = React.useCallback(
        (id: string) => {
            setModals(modals => modals.filter(modal => modal.id !== id));
        },
        [modals],
    );

    // =========================================================================
    // EFFECTS
    // =========================================================================
    useEffect(() => {
        console.log('Initializing Astro App');
    }, []);

    // =========================================================================
    // EXPOSED VALUES
    // =========================================================================
    const value = {
        Toast,
        Modal,
        test: 'hello',
    };

    // =========================================================================
    // RETURN
    // =========================================================================
    return (
        <AstroContext.Provider value={value}>
            {children}
            <ModalPlaceholder modals={modals} />
            <ToastPlaceholder toasts={toasts} />
        </AstroContext.Provider>
    );
};
export default AstroProvider;

// =============================================================================
// MODAL STUFF
// =============================================================================
