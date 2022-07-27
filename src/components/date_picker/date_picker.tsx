import React from 'react';
import {
    faCalendar,
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { DatePickerProps } from './date_picker.types';
import { onClickOutside } from '../../hooks/onClickOutside';
import moment from 'moment';
import { overrideTailwindClasses } from 'tailwind-override';
import CalendarDropdown from './date_picker_dropdown';
import { render } from 'react-dom';

const DatePicker = ({
    value,
    setter,
    name,
    label,
    placeholder = '',
    className,
    datetime = false,
    format,
    local = false,
    minYear = 1945,
    maxYear = 2045,
    borderWidth = 1,
}: DatePickerProps) => {
    // =========================================================================
    // STATES
    // =========================================================================
    const [menuOpen, setMenuOpen] = useState(false);
    const [labelIsFloating, setLabelIsFloating] = useState(false);
    const [innerValue, setInnerValue] = useState<Date | null>(null);
    const [outputDate, setOutputDate] = useState('');
    const [renderDate, setRenderDate] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const borderWidthString = borderWidth > 1 ? `-${borderWidth}` : '';

    // =========================================================================
    // FUNCTIONS
    // =========================================================================
    const toggleCalendar = () => {
        if (menuOpen) {
            closeDatePicker();
        } else {
            setLabelIsFloating(true);
            setMenuOpen(true);
        }
    };

    const handleInputValue = e => {
        setIsTyping(true);
        setRenderDate(e.target.value);

        // Attemp to parse date
        // const date = new Date(e.target.value);
        let decidedFormat = format ? format : datetime ? 'MM/DD/YYYY - h:mm A' : 'MM/DD/YYYY';
        const date = moment(e.target.value, decidedFormat, true);

        // Field is just nulls
        if (e.target.value === '') {
            setIsInvalid(false);
            setOutputDate('');
            setter(null);
        }

        // Valid Date
        else if (date.isValid()) {
            setIsInvalid(false);
            handleSettingOutput(date.toDate());
            setInnerValue(date.toDate());
        }

        // Invalid Date
        else {
            setIsInvalid(true);
            setOutputDate('');
            setter(null);
        }
    };

    const handleSettingOutput = (date: Date) => {
        let decidedFormat = format ? format : datetime ? 'MM/DD/YYYY - h:mm A' : 'MM/DD/YYYY';

        if (date) {
            let output = null;
            if (datetime) {
                output = moment(date)
                    .toISOString()
                    .replace('Z', local ? '' : 'Z');
            } else {
                output = moment(date)
                    .utcOffset(0, true)
                    .toISOString()
                    .replace('Z', local ? '' : 'Z');
            }

            // Update the rendered date in the input field
            setRenderDate(moment(date).format(decidedFormat));
            setOutputDate(output);
            setter(output);
        }
    };

    const handleSelectDate = (date: Date, closePicker: boolean) => {
        setInnerValue(date);
        handleSettingOutput(date);

        // If we want to close the date picker
        if (closePicker) {
            setLabelIsFloating(true);
            setMenuOpen(false);
        }
    };

    /**
     * Start Closing logic when clicking off or date picker being toggled
     */
    const closeDatePicker = () => {
        // Valid date
        if (!isInvalid && value) {
            setMenuOpen(false);
            setLabelIsFloating(true);
            return;
        }

        // Null Field
        if (!value) {
            setMenuOpen(false);
            setLabelIsFloating(false);
            return;
        }

        // // Invalid Date
        if (isInvalid) {
            setLabelIsFloating(false);
            setMenuOpen(false);
            return;
        }
    };

    const handlePickerFocus = () => {
        setMenuOpen(true);
        setLabelIsFloating(true);
    };

    // =========================================================================
    // NEW EFFECTS
    // =========================================================================

    // On Mount
    useEffect(() => {
        if (value) {
            setLabelIsFloating(true);
            setInnerValue(new Date(value));
        }
    }, []);

    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <div
            className={overrideTailwindClasses(
                `rounded-md relative w-full h-12 flex  border-gray dark:border-gray-dark text-body dark:text-body text-sm font-light tracking-wide  ${className} px-0`,
            )}
        >
            {/* START: OUTLINE CONTAINER ===================================== */}
            <div
                style={{
                    borderRadius: 'inherit',
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderColor: 'inherit',
                }}
                className={`w-4 border${borderWidthString} border-r-0 h-full rounded-inherit`}
            />

            <div
                style={{
                    borderRadius: 0,
                    borderColor: 'inherit',
                }}
                className={`h-full border${borderWidthString} ${
                    labelIsFloating ? 'border-t-0' : `border-t${borderWidthString}`
                } border-r-0 border-l-0 w-auto px-1 relative  transition-all duration-200`}
            >
                <span className="opacity-0">{label}</span>
                <span
                    className={`transform   transition-all duration-300 absolute left-0  ${
                        labelIsFloating
                            ? '-top-2 text-xs text-center w-full '
                            : '-translate-y-1/2 top-1/2 text-center w-full'
                    }`}
                >
                    {label}
                </span>
            </div>

            <div
                style={{
                    borderRadius: 'inherit',
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderColor: 'inherit',
                }}
                className={`w-8  border${borderWidthString} border-l-0 h-full rounded-inherit flex-1`}
            />
            {/* END: OUTLINE CONTAINER ===================================== */}
            <div className="absolute  top-0 left-0 w-full h-full px-4">
                <input
                    value={labelIsFloating ? renderDate : ''}
                    onChange={handleInputValue}
                    name={name}
                    placeholder={placeholder}
                    onFocus={handlePickerFocus}
                    onBlur={() => setIsTyping(false)}
                    style={{ background: 'rgba(0,0,0,0)' }}
                    className={`w-full align-middle h-full  outline-none text-body dark:text-body-dark`}
                />

                <FontAwesomeIcon
                    icon={faCalendar}
                    onClick={toggleCalendar}
                    className="-translate-y-1/2 absolute cursor-pointer right-4 text-body top-1/2 transform z-10"
                />
            </div>

            {/* DROP DOWN */}
            {menuOpen && (
                <CalendarDropdown
                    innerValue={innerValue}
                    handleSelectDate={handleSelectDate}
                    datetime={datetime}
                    format={format}
                    isInvalid={isInvalid}
                    closeDatePicker={closeDatePicker}
                    setInnerValue={setInnerValue}
                />
            )}
        </div>
    );
};

export default DatePicker;
