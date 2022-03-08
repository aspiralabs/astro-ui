import { faCheckCircle, faXmarkCircle, faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { uid } from 'uid';
import { useAstro } from '../..';
import { ToastPlaceholderProps, ToastContextValue, ToastMessageProps } from './toast.types';

// =============================================================================
// TYPES
// =============================================================================

// =============================================================================
// CREATE CONTEXT
// =============================================================================
export const ToastContext = createContext<ToastContextValue>({} as ToastContextValue);

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
const ToastMessage = ({ toast }: ToastMessageProps) => {
    const { Toast } = useAstro();

    const bg = toast.options?.variant || null;
    const variant = bg || toast.type;
    let toastStyles = `bg-${variant} text-${variant}-dark bg-opacity-20`;
    let icon = toast.options?.icon || null;

    switch (toast.type) {
        case 'success':
            icon = toast.options?.icon || faCheckCircle;
            break;
        case 'error':
            icon = toast.options?.icon || faXmarkCircle;
            break;
        case 'warning':
            icon = toast.options?.icon || faExclamationCircle;
            break;
        case 'info':
            icon = toast.options?.icon || faCircleQuestion;
            break;
    }

    // Timer Effect
    useEffect(() => {
        const timer = setTimeout(() => {
            Toast.remove(toast.id);
        }, toast.options?.timeout || 3000);
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
