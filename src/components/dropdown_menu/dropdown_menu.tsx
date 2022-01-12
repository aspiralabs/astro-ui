// Generated with util/create-component.js
import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion';
import { DropdownMenuProps, IDropdownEntry } from './dropdown_menu.types';
import Text from '../text/text';

const DropdownMenu: React.FC<DropdownMenuProps> = ({ open, setter, schema, right = false }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref = useRef<any>(null);

    const transition = {
        type: 'spring',
        duration: 0.2,
    };
    const animation = {
        initial: { opacity: 0, height: 0, transition },
        animate: { opacity: 1, height: 'auto', transition },
        exit: { opacity: 0, height: 0, transition },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setter(false);
        }
    };

    useEffect(() => {
        // Click Listener
        // TODO: Move this to a hook or something so other components could use
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
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
                    {schema.map((entry: IDropdownEntry) => {
                        return (
                            <li
                                className="bg-white flex gap-2 items-center p-3 text-body transition hover:bg-panel"
                                onClick={entry.action}
                                key={entry.title}
                            >
                                <i className={entry?.icon} />
                                <Text>{entry.title}</Text>
                            </li>
                        );
                    })}
                </motion.ul>
            )}
        </AnimatePresence>
    );
};

export default DropdownMenu;
