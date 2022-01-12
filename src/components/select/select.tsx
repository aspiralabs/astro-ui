// Generated with util/create-component.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import Text from '../text/text';
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion';

import { SelectOptionsEntry, SelectProps } from './select.types';
import { Input } from '../..';
// =============================================================================
// ANIMATION SETTINGS
// =============================================================================
const transition = {
    type: 'spring',
    duration: 0.2,
};
const animation = {
    initial: { opacity: 0, height: 0, transition },
    animate: { opacity: 1, height: 'auto', transition },
    exit: { opacity: 0, height: 0, transition },
};

const Select: React.FC<SelectProps> = ({
    required = false,
    label,
    value = '',
    setter,
    message,
    searchable = false,
    options,
    optionLabel = 'label',
    optionValue = 'value',
}) => {
    // =========================================================================
    // STATES
    // =========================================================================
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref = useRef<any>(null);
    const [borderColor, setBorderColor] = useState('');
    const [open, setOpen] = useState(false);
    const [defaultOptions] = useState(options);
    const [results, setResults] = useState(options);
    const [selectedValue, setSelectedValue] = useState<string | number>(value);
    const [selectedOptionLabel, setSelectedOptionLabel] = useState(value);
    const [searchTerm, setSearchTerm] = useState('');

    // =========================================================================
    // DEBOUNCED TERM
    // =========================================================================
    const debouncedSearchTerm = useDebounce(searchTerm, 200);

    // =========================================================================
    // HANDLE OPTION CLICK
    // =========================================================================
    const handleOptionClick = (option: SelectOptionsEntry) => {
        // Update States
        setSelectedOptionLabel(option[optionLabel]);
        setSelectedValue(option[optionValue]);
        if (setter) {
            setter(option[optionValue]);
        }
        setOpen(false);
    };

    // =========================================================================
    // HANDLE CLICKING OUT OF OPTIONS TO CLOSE BOX
    // =========================================================================
    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setOpen(false);
        }
    };

    // =========================================================================
    // HANDLE INPUT CLICK
    // =========================================================================
    const handleBoxClick = (e: any) => {
        // If the xmark is chosen
        if (e.target.className?.baseVal?.includes('fa-xmark')) {
            return;
        } else {
            setOpen(!open);
        }
    };

    // =========================================================================
    // USE EFFECT
    // =========================================================================
    useEffect(() => {
        if (message?.message) {
            let color = 'border ';

            if (message?.type === 'error') color += 'border-danger';
            if (message?.type === 'success') color += 'border-success';

            setBorderColor(color);
        } else {
            setBorderColor('border');
        }
    }, [message]);

    // =========================================================================
    // FIRST MOUNT
    // =========================================================================
    useEffect(() => {
        // Click Listener
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    // =========================================================================
    // WHEN A SEARCH TERM IS UPDATED
    // =========================================================================
    useEffect(() => {
        if (debouncedSearchTerm) {
            // Filter
            const filteredResults = defaultOptions.filter((option: any) => {
                return option[optionLabel].toLowerCase().includes(debouncedSearchTerm.toLowerCase());
            });

            // Update Filtered Results
            setResults(filteredResults);
        } else {
            setResults(defaultOptions);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm]);

    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <fieldset className="relative w-full">
            {/* LABELS */}
            {label && (
                <label className="block font-body font-light mb-2 text-body text-sm">
                    {label} {required && <span className="text-red-700">*</span>}
                </label>
            )}

            {/* INPUT BOX */}

            <div
                onClick={handleBoxClick}
                className={`flex justify-between main-dropdown-container border ${
                    open ? 'border-primary' : borderColor
                } cursor-pointer relative rounded-sm font-body text-sm   w-full items-center h-12 font-light tracking-wide`}
            >
                {/* TEXT AREA */}
                <div className="px-4">
                    <Text>{selectedOptionLabel}</Text>
                </div>

                {/* ICON AREA */}
                {/* <div className="flex h-full items-center justify-center w-8">
                    {!selectedValue && (
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`text-body-light transform transition ${open ? 'rotate-180' : ''}`}
                        />
                    )}
                    {selectedValue && (
                        <FontAwesomeIcon
                            icon={faXmark}
                            className="text-body-light"
                            onClick={() => handleOptionClick({ value: '' })}
                        />
                    )}
                </div> */}
            </div>

            {/* DROPDOWN */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={ref}
                        initial={animation.initial}
                        animate={animation.animate}
                        exit={animation.exit}
                        className="absolute bg-white shadow-lg w-full z-50"
                    >
                        {searchable && (
                            <div className="border-b p-2">
                                <Input value={searchTerm} setter={setSearchTerm} />
                            </div>
                        )}
                        <ul className="divide-pagebg divide-y max-h-48 overflow-y-auto">
                            {results.map((option: SelectOptionsEntry, index: number) => {
                                return (
                                    <li
                                        onClick={() => handleOptionClick(option)}
                                        key={index}
                                        className="cursor-pointer px-4 py-3 hover:bg-pagebg"
                                    >
                                        <Text>{option && option[optionLabel]}</Text>
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MESSAGE BOX */}
            <div className="flex gap-1 items-center py-1">
                {message?.message && (
                    <React.Fragment>
                        {message?.type === 'error' && (
                            <i className="fa-circle-exclamation fa-regular mr-2 text-danger" />
                        )}
                        {message?.type === 'success' && <i className="fa-circle-check fa-regular mr-2 text-success" />}
                        <p
                            className={`text-sm font-body ${
                                message?.type === 'error' ? 'text-danger' : 'text-success'
                            } `}
                        >
                            {message?.message}
                        </p>
                    </React.Fragment>
                )}
            </div>
        </fieldset>
    );
};

export default Select;
