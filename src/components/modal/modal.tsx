import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion';
import React, { Attributes, createContext, FC, useContext, useEffect, useState } from 'react';
import { useAstro } from '../..';
import { BaseModalProps, ModalPlaceholderProps } from './modal.types';

export const ModalPlaceholder = ({ modals }: ModalPlaceholderProps) => {
    const { Modal } = useAstro();
    const [isOpen, setIsOpen] = useState(false);

    const handleCloseModal = (id: string) => {
        Modal.hide(id);
    };

    useEffect(() => {
        if (modals.length > 0) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [modals]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }}
                    exit={{ opacity: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }}
                    className="bg-black bg-opacity-25 fixed flex h-screen items-center justify-center p-8 top-0 w-screen z-50"
                >
                    <AnimatePresence>
                        {modals.map((modal, index) => {
                            const props = {
                                id: modal.id,
                                ...modal.props,
                            };

                            console.log(props);

                            return (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        delay: 3,
                                        transition: { delay: 0.05, duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.8,
                                        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                                    }}
                                    className="pointer-events-auto"
                                    key={index}
                                >
                                    <div className="relative ">
                                        {modal.props?.closeIcon && (
                                            <div
                                                className="absolute top-3 right-3 cursor-pointer"
                                                style={{ zIndex: 10000 }}
                                                onClick={() => handleCloseModal(modal.id)}
                                            >
                                                <FontAwesomeIcon
                                                    className="text-body text-opacity-50 hover:text-opacity-100 transition"
                                                    icon={faXmark}
                                                />
                                            </div>
                                        )}

                                        {React.createElement<any>(modal.component, props)}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
