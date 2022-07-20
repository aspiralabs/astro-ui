// Generated with util/create-component.js
import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion';
import { DropdownMenuProps, DropdownEntry } from './menu.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Text from '../text/text';
import { onClickOutside } from '../../hooks/onClickOutside';
import { overrideTailwindClasses } from 'tailwind-override';

const Menu = ({ children, open, setter, schema, right = false, className }: DropdownMenuProps) => {
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
                        className={overrideTailwindClasses(
                            `absolute top-full ${
                                right ? 'right-0' : 'left-0'
                            } bg-white shadow-lg mt-1 w-48 text-left font-body text-sm z-50 ${className}`,
                        )}
                    >
                        {schema.map((entry: DropdownEntry) => {
                            return (
                                <li
                                    className={`flex gap-2 items-center  text-body transition ${
                                        !entry.render && 'hover:bg-surface'
                                    }`}
                                    onClick={entry.action}
                                    key={entry.title}
                                >
                                    {entry.render && entry.render}
                                    {!entry.render && <Text className="p-4 cursor-pointer">{entry.title}</Text>}
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
