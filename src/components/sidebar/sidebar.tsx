// Generated with util/create-component.js
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion';
import { SidebarProps } from './sidebar.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ open, setter, children, width = '360px' }: SidebarProps) => {
    const menuStates = {
        initial: { right: `-${width}`, width: `${width}` },
        open: {
            width: `${width}`,
            right: 0,
            transition: { type: 'spring', duration: 0.5 },
        },
        exit: {
            right: `-${width}`,
            transition: { type: 'spring', duration: 0.5 },
        },
    };

    const opacityStates = {
        initial: { opacity: 0 },
        open: { opacity: 1, transition: { type: 'spring', duration: 0.5 } },
        exit: { opacity: 0, transition: { type: 'spring', duration: 0.5 } },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClick = (e: any) => {
        if (e.target.id === 'black-bg') setter(false);
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={opacityStates.initial}
                    animate={opacityStates.open}
                    exit={opacityStates.exit}
                    onClick={handleClick}
                    id="black-bg"
                    className="bg-black bg-opacity-40 fixed h-screen left-0 top-0 w-screen z-50"
                >
                    <motion.aside
                        initial={menuStates.initial}
                        animate={menuStates.open}
                        exit={menuStates.exit}
                        className="absolute bg-card dark:bg-card-dark h-screen overflow-y-auto p-8 right-0"
                    >
                        <button
                            className="absolute bg-surface w-6 h-6 rounded-full flex items-center justify-center right-4 top-4 opacity-50 hover:opacity-100 transition"
                            onClick={() => setter(false)}
                        >
                            <FontAwesomeIcon icon={faXmark} className="text-body text-sm" />
                        </button>

                        {children}
                    </motion.aside>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Sidebar;
