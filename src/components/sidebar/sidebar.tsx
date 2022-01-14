// Generated with util/create-component.js
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { SidebarProps } from './sidebar.types';

const Sidebar: React.FC<SidebarProps> = ({ open, setter, children, width = '360px' }) => {
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
                        className="absolute bg-white h-screen overflow-y-auto p-8 right-0"
                    >
                        <button className="absolute right-4 top-4" onClick={() => setter(false)}>
                            <i className="fa-regular fa-xmark" />
                        </button>

                        {children}
                    </motion.aside>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Sidebar;
