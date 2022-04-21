// Generated with util/create-component.js
import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion';
import { DropdownMenuProps, DropdownEntry } from './menu.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Text from '../text/text';
import { onClickOutside } from '../../hooks/onClickOutside';

const Menu = ({ children, open, setter, schema, right = false }: DropdownMenuProps) => {
    const ref = useRef(null);
    onClickOutside(ref, () => setter(false));

    const transition = {
        type: 'spring',
        duration: 0.2,
    };
    const animation = {
        initial: { opacity: 0, height: 0, transition },
        animate: { opacity: 1, height: 'auto', transition },
        exit: { opacity: 0, height: 0, transition },
    };

    return (
        <div className="relative">
            {children}
            <AnimatePresence>
                {open && (
                    <motion.ul
                        ref={ref}
                        initial={animation.initial}
                        animate={animation.animate}
                        exit={animation.exit}
                        className={`absolute top-full ${
                            right ? 'right-0' : 'left-0'
                        } bg-white shadow-lg mt-1 w-48 text-left font-proxima text-sm z-50`}
                    >
                        {schema.map((entry: DropdownEntry) => {
                            return (
                                <li
                                    className="bg-white flex gap-2 items-center p-3 text-body transition hover:bg-surface"
                                    onClick={entry.action}
                                    key={entry.title}
                                >
                                    {entry?.icon && <FontAwesomeIcon icon={entry.icon} />}
                                    <Text>{entry.title}</Text>
                                </li>
                            );
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Menu;
