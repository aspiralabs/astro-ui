// Generated with util/create-component.js
import React, { useEffect, useState } from 'react';
import { uid } from 'uid';
import {
    AstroContextValue,
    IBaseModalProps,
    Modal,
    ModalObject,
    ModalPlaceholderProps,
    Toast,
    ToastMessageProps,
    ToastObject,
    ToastPlaceholderProps,
} from './astro.types';

// Create the Context
export const AstroContext = React.createContext<AstroContextValue>({} as AstroContextValue);
export const useAstro = () => React.useContext(AstroContext);

// Create the Provider used to wrap app
const AstroProvider: React.FC = ({ children }) => {
    // =========================================================================
    // STATES
    // =========================================================================
    const [modals, setModals] = useState<ModalObject[]>([]);
    const [toasts, setToasts] = useState<ToastObject[]>([]);

    // =========================================================================
    // MODALS
    // =========================================================================
    const Modal: Modal = {
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
        [setModals],
    );

    // =========================================================================
    // TOASTS
    // =========================================================================

    // Toast Object
    const Toast: Toast = {
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
        (id: string) => {
            setToasts(toasts => toasts.filter(toast => toast.id != id));
        },
        [setToasts],
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

const ModalPlaceholder: React.FC<ModalPlaceholderProps> = ({ modals }) => {
    if (modals.length === 0) {
        return null;
    } else {
        return (
            <div
                style={{ zIndex: 10000 }}
                className="bg-black bg-opacity-25 fixed flex h-screen items-center justify-center top-0 w-screen"
            >
                {modals.map(modal => {
                    const props: IBaseModalProps = {
                        id: modal.id,
                        key: modal.id,
                        ...modal.props,
                    };

                    return React.createElement(modal.component, props);
                })}
            </div>
        );
    }
};
// =============================================================================
// TOAST STUFF
// =============================================================================

const ToastPlaceholder: React.FC<ToastPlaceholderProps> = ({ toasts }) => {
    {
        return (
            <div style={{ zIndex: 10000 }} className="fixed flex h-screen left-0 pointer-events-none top-0 w-screen">
                <div className="flex-col items-center mx-auto px-8 py-4 self-end w-full" style={{ maxWidth: 500 }}>
                    {toasts.map(toast => (
                        <ToastMessage key={toast.id} toast={toast} />
                    ))}
                </div>
            </div>
        );
    }
};

const ToastMessage: React.FC<ToastMessageProps> = ({ toast }) => {
    const { Toast } = useAstro();

    // Calculated Styles
    let toastStyles = '';
    switch (toast.type) {
        case 'success':
            toastStyles = 'bg-success';
            break;
        case 'error':
            toastStyles = 'bg-error';
            break;
        case 'warning':
            toastStyles = 'bg-warning';
            break;
        case 'info':
            toastStyles = 'bg-info';
            break;
        default:
            toastStyles = 'bg-info';
    }

    // Timer Effect
    useEffect(() => {
        const timer = setTimeout(() => {
            Toast.remove(toast.id);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [Toast, toast.id]);

    // Main Render
    return <div className={`${toastStyles} block my-4 p-4 rounded text-white`}>{toast.message}</div>;
};
