/* eslint-disable @typescript-eslint/no-explicit-any */
import { faChevronDown, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useDebounce from '../../hooks/useDebounce';
import Text from '../text/text';
import Input from '../input/input';
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { SelectOptionsEntry, SelectProps } from './select.types';

// =============================================================================
// CONST
// =============================================================================
const SPACEBAR_KEY_CODE = [0, 32];
const ENTER_KEY_CODE = 13;
const DOWN_ARROW_KEY_CODE = 40;
const UP_ARROW_KEY_CODE = 38;
const ESCAPE_KEY_CODE = 27;

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

// =============================================================================
// DROPDOWN
// =============================================================================
const Select = ({
    required = false,
    label,
    value = '',
    setter,
    message,
    searchable = false,
    options,
    optionLabel = 'label',
    optionValue = 'value',
    placeholder,
}: SelectProps) => {
    // =========================================================================
    // STATES
    // =========================================================================
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref = useRef<any>(null);
    const selectRef = useRef<any>(null);
    const selectULRef = useRef<any>(null);
    const a11yIndexRef = useRef<number>(-1);
    const [borderColor, setBorderColor] = useState('');
    const [open, setOpen] = useState(false);
    const [defaultOptions] = useState(options);
    const [results, setResults] = useState(options);
    const [selectedValue, setSelectedValue] = useState<string | number>(value);
    const [selectedOptionLabel, setSelectedOptionLabel] = useState(value);
    const [searchTerm, setSearchTerm] = useState('');
    const [labelIsFloating, setLabelIsFloating] = useState(false);
    const [a11ySelectedFieldIndex, setA11ySelectedFieldIndex] = useState(-1);

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
        setter && setter(option[optionValue]);
        if (option.value === '') setLabelIsFloating(false);
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

            if (message?.type === 'error') color += 'border-error';
            if (message?.type === 'success') color += 'border-success';

            setBorderColor(color + 'border-surface-dark');
        } else {
            setBorderColor('border border-surface-dark');
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

    useEffect(() => {
        if (open) {
            setLabelIsFloating(true);
            selectULRef.current.focus();
        } else {
            if (!selectedValue) {
                setLabelIsFloating(false);
            }
        }
    }, [open]);

    // =========================================================================
    // FUNCTIONS
    // =========================================================================
    const handleListKeyDown = e => {
        switch (e.key) {
            case 'Escape':
                e.preventDefault();
                setOpen(false);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setA11ySelectedFieldIndex(
                    a11ySelectedFieldIndex - 1 >= 0 ? a11ySelectedFieldIndex - 1 : results.length - 1,
                );
                break;
            case 'ArrowDown':
                e.preventDefault();
                setA11ySelectedFieldIndex(
                    a11ySelectedFieldIndex == results.length - 1 ? 0 : a11ySelectedFieldIndex + 1,
                );
                break;
            case 'Enter':
                if (open) {
                    handleOptionClick(results[a11ySelectedFieldIndex]);
                }
            default:
                break;
        }
    };

    const handleKeyDown = e => {
        switch (e.key) {
            case ' ':
            case 'SpaceBar':
            case 'Enter':
                e.preventDefault();
                handleOptionClick(results[a11ySelectedFieldIndex]);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        console.log('ally index', a11ySelectedFieldIndex);
    });

    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <fieldset className="relative w-full">
            {/* INPUT BOX */}
            <button
                ref={selectRef}
                type="button"
                onClick={handleBoxClick}
                onKeyDown={handleListKeyDown}
                className={`flex justify-between main-dropdown-container border text-left ${
                    open ? 'border-primary' : borderColor
                } bg-white cursor-pointer relative rounded-sm font-body text-sm  w-full items-center h-12 font-light tracking-wide focus:outline focus:outline-1 focus:outline-primary`}
            >
                {/* TEXT AREA */}
                <div className="px-4">{selectedOptionLabel && <Text>{selectedOptionLabel}</Text>}</div>

                {label && (
                    <label className="font-body font-light  text-body text-sm  transition-all duration-300 pointer-events-none w-full h-full absolute left-0 top-0 px-2">
                        <span
                            className={`absolute transform transitional-all duration-300 px-1.5 ${
                                labelIsFloating ? '-top-2 text-xs bg-white' : 'top-1/2 -translate-y-1/2'
                            } h-auto `}
                        >
                            {label}
                        </span>
                        {required && <span className="text-red-700">*</span>}
                    </label>
                )}

                {/* ICON AREA */}
                <div className="flex h-full items-center justify-center w-8 ">
                    {!selectedValue && (
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`text-body-light transform transition ${open ? 'rotate-180' : ''}`}
                        />
                    )}
                    {selectedValue && (
                        <FontAwesomeIcon
                            icon={faXmark}
                            className="text-body-light "
                            onClick={() => handleOptionClick({ value: '' })}
                        />
                    )}
                </div>
            </button>

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
                                <Input value={searchTerm} setter={setSearchTerm} icon={faSearch} />
                            </div>
                        )}
                        <ul
                            className="divide-surface divide-y max-h-48 overflow-y-auto focus:outline-none"
                            tabIndex={-1}
                            onKeyDown={handleListKeyDown}
                            role="listbox"
                            ref={selectULRef}
                            onBlur={() => setOpen(false)}
                        >
                            {results.map((option: SelectOptionsEntry, index: number) => {
                                const highlighted = index === a11ySelectedFieldIndex;

                                console.log(highlighted);

                                return (
                                    <li
                                        onClick={() => handleOptionClick(option)}
                                        key={index}
                                        role="option"
                                        onKeyDown={handleKeyDown}
                                        className={`cursor-pointer px-4 py-3 hover:bg-surface ${
                                            highlighted ? 'bg-surface' : 'bg-white'
                                        }`}
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
            <div className="flex items-center">
                {message?.message && (
                    <React.Fragment>
                        {message?.type === 'error' && (
                            <i className="fa-circle-exclamation fa-regular mr-2 text-error" />
                        )}
                        {message?.type === 'success' && <i className="fa-circle-check fa-regular mr-2 text-success" />}
                        <p
                            className={`text-sm font-body ${
                                message?.type === 'error' ? 'text-error' : 'text-success'
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
