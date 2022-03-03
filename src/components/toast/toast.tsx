import { faCheckCircle, faXmarkCircle, faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { uid } from 'uid';
import { useAstro } from '../..';

// =============================================================================
// TYPES
// =============================================================================
interface ToastWrapperProps {
    children: React.ReactNode;
}

interface ToastPlaceholderProps {
    toasts: ToastObject[];
}
interface ToastMessageProps {
    toast: ToastObject;
}

interface ToastObject {
    message: string;
    type: string;
    id: string;
}
export interface ToastMethods {
    success: (message: string) => void;
    warning: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
    remove: any;
}

interface ToastContext {
    Toast: ToastMethods;
}
// =============================================================================
// CREATE CONTEXT
// =============================================================================
export const ToastContext = createContext<ToastContext>({} as ToastContext);

// =============================================================================
// MODAL PLACEHOLDER
// =============================================================================
export const ToastPlaceholder: React.FC<ToastPlaceholderProps> = ({ toasts }) => {
    {
        return (
            <div
                className="-translate-x-1/2 absolute bottom-0 flex flex-col gap-4 left-1/2 overflow-hidden p-4 transform w-full z-50"
                style={{ maxWidth: 500 }}
            >
                <AnimatePresence>
                    {toasts.map(toast => (
                        <ToastMessage key={toast.id} toast={toast} />
                    ))}
                </AnimatePresence>
            </div>
        );
    }
};

// =============================================================================
// TOAST MESSAGE
// =============================================================================
const ToastMessage: React.FC<ToastMessageProps> = ({ toast }) => {
    const { Toast } = useAstro();

    // Calculated Styles
    let toastStyles = '';
    let icon = null;
    switch (toast.type) {
        case 'success':
            toastStyles = 'bg-success text-success-dark bg-opacity-20';
            icon = faCheckCircle;
            break;
        case 'error':
            toastStyles = 'bg-danger text-danger-dark bg-opacity-20';
            icon = faXmarkCircle;

            break;
        case 'warning':
            toastStyles = 'bg-warning text-warning-dark bg-opacity-20';
            icon = faCircleQuestion;

            break;
        case 'info':
            toastStyles = 'bg-info text-info-dark bg-opacity-20';
            icon = faCircleQuestion;

            break;
        default:
            toastStyles = 'bg-info text-info-dark bg-opacity-20';
            icon = faCircleQuestion;
    }

    // Timer Effect
    useEffect(() => {
        const timer = setTimeout(() => {
            Toast.remove(toast.id);
        }, 3000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    // Main Render
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
            }}
            exit={{
                opacity: 0,
                y: 20,
                scale: 0.2,
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
            }}
            className={`${toastStyles} px-6 py-4 rounded shadow-lg text-sm relative flex gap-4 items-center`}
            layout
        >
            <div>
                <FontAwesomeIcon icon={icon} className="text-2xl" />
            </div>
            <div>{toast.message}</div>
        </motion.div>
    );
};
// =============================================================================
// HOOK FOR TAPPING INTO CONTEXT
// =============================================================================
const useToast = () => {
    const context = useContext(ToastContext);

    // if `undefined`, throw an error
    if (context === undefined) {
        throw new Error('useUserContext was used outside of its Provider');
    }

    return context;
};
