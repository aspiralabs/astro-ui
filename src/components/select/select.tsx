import { text } from '@fortawesome/fontawesome-svg-core';
import React, { useEffect, useRef, useState } from 'react';
import { uid } from 'uid';
import { SelectOptionsEntry, SelectProps } from './select.types';
import { overrideTailwindClasses } from 'tailwind-override';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

const Select = ({ className, label, value = null, setter, options }: SelectProps) => {
    // =========================================================================
    // STATES
    // =========================================================================
    const [filteredOptions, setFilteredOptions] = useState<SelectOptionsEntry[]>(options);
    const [focusedValue, setFocusedValue] = useState<string | null>(null);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
    const [labelFloating, setLabelIsFloating] = useState(false);
    const [dropwdownOpen, setDropdownOpen] = useState(false);
    const [searchText, setSearchText] = useState('');

    // =========================================================================
    // REFS
    // =========================================================================
    const listRef = useRef(null);
    const buttonRef = useRef(null);
    const selectId = uid();

    // =========================================================================
    // FUNCTIONS
    // =========================================================================
    const toggleDropdown = () => {
        if (dropwdownOpen) setSearchText('');
        setDropdownOpen(dropdown => !dropdown);
    };

    // Filters through the options based on inputted string
    const filterOptions = (text: string) => {
        return options && options.filter(option => option.label.toLowerCase().includes(text.toLowerCase()));
    };

    // Given a value, find the label or return empty string if not found
    const returnLabelForValue = value => {
        return options.find(option => option.value === value).label || '';
    };

    // =========================================================================
    // EVENTS
    // =========================================================================
    const handleClearValue = () => {
        setSelectedLabel(null);
        setSelectedValue(null);
        setLabelIsFloating(false);
    };

    const handleButtonClick = () => {
        toggleDropdown();
    };

    const handleEntryClick = option => e => {
        setSelectedValue(option.value);
        setSelectedLabel(option.label);
        setSearchText('');
        setFilteredOptions(options);
        toggleDropdown();
        e.stopPropagation();
    };

    const handleButtonKeypress = e => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            toggleDropdown();
        }
    };

    const handleKeypress = e => {
        e.persist();
        e.preventDefault();

        const isUpKey = e.key === 'ArrowUp';
        const isDownKey = e.key === 'ArrowDown';
        const isEnter = e.key === 'Enter';
        const isTab = e.key === 'Tab';
        const isEsc = e.key === 'Escape';
        const isBackspace = e.key === 'Backspace';
        const currentIndex = options.findIndex(option => option.value === focusedValue);

        // User Presses Down Arrow
        if (currentIndex !== options.length - 1 && isDownKey) {
            setFocusedValue(options[currentIndex + 1].value);
            return;
        }

        // User Presses Up Arrow
        if (currentIndex !== 0 && isUpKey) {
            setFocusedValue(options[currentIndex - 1].value);
            return;
        }

        // User Presses Enter To Select Value
        if (isEnter) {
            setSelectedValue(focusedValue);
            setSelectedLabel(returnLabelForValue(focusedValue));
            setFilteredOptions(options);
            toggleDropdown();
            setSearchText('');
            return;
        }

        // User Presses ESC or Tab to close the dropdown
        if (isTab || isEsc) {
            toggleDropdown();
            return;
        }

        if (isBackspace && searchText.length > 0) {
            const text = searchText.slice(0, -1);
            const matchedOptions = filterOptions(text);
            if (matchedOptions.length) {
                setFilteredOptions(matchedOptions);
                setFocusedValue(matchedOptions[0].value);
            }
            setSearchText(text);
        }

        // Key code between 65 and 90 means some type of letter
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            const text = searchText + e.key;
            const matchedOptions = filterOptions(text);
            if (matchedOptions.length) {
                setFilteredOptions(matchedOptions);
                setFocusedValue(matchedOptions[0].value);
            }

            setSearchText(text);
        }
    };

    // =========================================================================
    // EFFECTS
    // =========================================================================
    useEffect(() => {
        if (dropwdownOpen) {
            listRef.current.focus();
            setLabelIsFloating(true);
        } else {
            listRef.current.setAttribute('tab-index', '-1');
            buttonRef.current.focus();
            if (!selectedValue) setLabelIsFloating(false);
        }

        // CLICK LISTENER ======================================================
        const clickListener = e => {
            if (e.target !== listRef.current && e.target !== buttonRef.current) {
                toggleDropdown();
            }
        };

        if (dropwdownOpen) {
            window.addEventListener('click', clickListener);
        } else {
            window.removeEventListener('click', clickListener);
        }

        return () => {
            window.removeEventListener('click', clickListener);
        };
    }, [dropwdownOpen]);

    useEffect(() => {
        // Output Value Here
        setter(selectedValue);
    }, [selectedValue]);

    useEffect(() => {
        if (value) {
            setSelectedValue(value);
            setSelectedLabel(returnLabelForValue(value));
            setLabelIsFloating(true);
        }
    }, []);

    // =========================================================================
    // CLASS CONSTRUCTION
    // =========================================================================
    const baseContainerClass = `relative rounded-sm w-full h-12 flex flex text-body text-sm items-start flex-start`;
    const baseBorderClass = `border border-surface-dark`;
    const labelBaseClass = `absolute font-body font-light text-body transform transitional-all duration-300 `;
    const labelFloatingClass = labelFloating ? '-top-2 text-xs bg-white px-1 -ml-1' : 'top-1/2 -translate-y-1/2 ';

    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <div
            className={overrideTailwindClasses(`astro-ui-select ${baseContainerClass} ${baseBorderClass} ${className}`)}
        >
            <button
                ref={buttonRef}
                onClick={handleButtonClick}
                onKeyDown={handleButtonKeypress}
                aria-haspopup="listbox"
                aria-labelledby={`${selectId}btn`}
                id={`${selectId}-btn`}
                className="w-full h-full px-4 flex items-center flex-1"
            >
                {/* LABEL ================================================== */}
                {label && <span className={`${labelBaseClass} ${labelFloatingClass}`}>{label}</span>}

                {/* DROPDOWN =============================================== */}
                {dropwdownOpen && (
                    <React.Fragment>
                        <span>{searchText}</span>
                        <span className="w-0.5 h-1/2 bg-primary pulse"></span>
                    </React.Fragment>
                )}

                {selectedLabel && !searchText && <span>{selectedLabel}</span>}
            </button>

            {/* ICON ======================================================= */}
            <div className="flex items-center justify-center w-8 h-full">
                {selectedValue && (
                    <FontAwesomeIcon
                        icon={faXmark}
                        className={`text-normal transform transition cursor-pointer`}
                        onClick={handleClearValue}
                    />
                )}
                {!selectedValue && (
                    <FontAwesomeIcon
                        onClick={toggleDropdown}
                        icon={faChevronDown}
                        className={`text-normal transform transition cursor-pointer ${
                            dropwdownOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                    />
                )}
            </div>

            {/* DROPDOWN =================================================== */}
            <ul
                ref={listRef}
                onKeyDown={handleKeypress}
                role="listbox"
                tabIndex={-1}
                className={`bg-white border border-surface-dark ${
                    dropwdownOpen ? 'absolute' : 'hidden'
                } top-full z-40 w-full mt-2 rounded-sm`}
                aria-labelledby={selectId}
            >
                {filteredOptions.map(option => (
                    <li
                        onClick={handleEntryClick(option)}
                        tabIndex={-1}
                        role="option"
                        key={option.value}
                        value={option.value}
                        aria-label={option.label}
                        id={`${selectId}_${option.value}`}
                        className={`${
                            focusedValue === option.value && 'bg-surface-dark'
                        } px-4 py-2 hover:bg-surface cursor-pointer`}
                    >
                        {!option.render && option.label}
                        {option.render && option.render}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Select;
