// Generated with util/create-component.js
import React, { useContext, useEffect, useState } from 'react';
import { uid } from 'uid';
import { ToastMethods, ToastPlaceholder } from '../toast/toast';
import { AstroContextValue, ToastObject } from './astro.types';
import { ModalMethods, ModalObject } from '../modal/modal.types';
import { ModalPlaceholder } from '../modal/modal';
import { AnimatePresence } from 'framer-motion/dist/framer-motion';

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
        success: message => addToast(message, 'success'),
        warning: message => addToast(message, 'warning'),
        error: message => addToast(message, 'error'),
        info: message => addToast(message, 'info'),
        remove: id => removeToast(id),
    };

    // GENERAL ADD TOAST METHOD
    const addToast = React.useCallback(
        (message: string, type: string) => {
            const newToastObject: ToastObject = {
                message,
                type,
                id: uid(),
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
