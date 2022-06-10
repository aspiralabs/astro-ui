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

    // =========================================================================
    // FUNCTIONS
    // =========================================================================
    const toggleCalendar = () => {
        if (menuOpen) {
            setMenuOpen(!menuOpen);
        } else {
            setMenuOpen(!menuOpen);
        }
    };

    const handleInputValue = e => {
        setIsTyping(true);
        setRenderDate(e.target.value);

        // Attemp to parse date
        // const date = new Date(e.target.value);
        let decidedFormat = format ? format : datetime ? 'MM/DD/YYYY - h:mm A' : 'MM/DD/YYYY';
        const date = moment(e.target.value, decidedFormat).toDate();

        console.log(date);

        // Valid Date
        if (date.getTime()) {
            setIsInvalid(false);
            setInnerValue(date);
        }

        // Invalid Date
        else {
            setIsInvalid(true);
        }
    };

    const handleSettingOutput = (date: Date) => {
        if (date) {
            if (!datetime) {
                setOutputDate(
                    moment(date)
                        .utcOffset(0, true)
                        .toISOString()
                        .replace('Z', local ? '' : 'Z'),
                );
            } else {
                setOutputDate(
                    moment(date)
                        .toISOString()
                        .replace('Z', local ? '' : 'Z'),
                );
            }
        }
    };

    const handleSelectDate = (date: Date) => {
        console.log('Selected Date', date);

        // Valid Date
        if (date.getTime()) {
            setInnerValue(date);
        }

        // Invalid Date
        else {
            setOutputDate('');
        }
    };

    // =========================================================================
    // NEW EFFECTS
    // =========================================================================

    // Call back setter when the output date changes
    useEffect(() => {
        outputDate && setter(outputDate);
    }, [outputDate]);

    // On Mount
    useEffect(() => {
        if (value) {
            setLabelIsFloating(true);
            setInnerValue(new Date(value));
        }

        // Debugging
        setMenuOpen(true);
    }, []);

    // =========================================================================
    // EFFECT
    // =========================================================================

    useEffect(() => {
        if (innerValue && !isTyping) {
            let decidedFormat = format ? format : datetime ? 'MM/DD/YYYY - h:mm A' : 'MM/DD/YYYY';
            handleSettingOutput(innerValue);
            setRenderDate(moment(innerValue).format(decidedFormat));
        }
    }, [innerValue]);

    const handlePickerFocus = () => {
        setMenuOpen(true);
    };

    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <div className="relative w-full h-12">
            {/* <label className="block font-body font-light mb-2 text-body text-sm">{label}</label> */}

            <div className="relative">
                <input
                    value={labelIsFloating && renderDate}
                    onChange={handleInputValue}
                    name={name}
                    placeholder={placeholder}
                    onFocus={handlePickerFocus}
                    onBlur={() => setIsTyping(false)}
                    className={`astro_date_picker appearance-none border relative rounded-sm text-body border-surface-dark text-sm px-4 pr-12 focus:outline-none focus:border-primary  w-full align-middle h-12 font-light tracking-wide ${className}`}
                />

                {label && (
                    <label className="font-body font-light  text-body text-sm  transition-all duration-300 pointer-events-none w-full h-full absolute left-0 top-0 px-2">
                        <span
                            className={`absolute transform transitional-all duration-300 px-1.5 h-auto ${
                                labelIsFloating ? '-top-2 text-xs bg-white' : 'top-1/2 -translate-y-1/2'
                            }`}
                        >
                            {label}
                            {/* {labelIsFloating ? 'true' : 'false'} */}
                        </span>
                    </label>
                )}
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
                />
            )}
        </div>
    );
};

const CalendarDropdown = ({
    innerValue,
    handleSelectDate,
    datetime,
    format,
    isInvalid,
}: {
    innerValue: Date | null;
    handleSelectDate: any;
    datetime: boolean;
    format: string;
    isInvalid: boolean;
}) => {
    const [currentMonth, setCurrentMonth] = useState(1);
    const [currentYear, setCurrentYear] = useState(2022);
    const [currentHour, setCurrentHour] = useState(0);
    const [currentMinute, setCurrentMinute] = useState(30);
    const [blankdays, setBlankDays] = useState<number[]>([]);
    const [days, setDays] = useState<number[]>([]);
    const [mounted, setMounted] = useState(false);

    // =========================================================================
    // CONSTS
    // =========================================================================
    const MONTH_NAMES = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // =========================================================================
    // FUNCTIONS
    // =========================================================================

    const getDays = () => {
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // find where to start calendar day of week
        const dayOfWeek = new Date(currentYear, currentMonth).getDay();
        const blankdaysArray = [];
        for (let i = 1; i <= dayOfWeek; i++) {
            blankdaysArray.push(i);
        }

        const daysArray = [];
        for (let i = 1; i <= daysInMonth; i++) {
            daysArray.push(i);
        }

        setBlankDays(blankdaysArray);
        setDays(daysArray);
    };

    const determineDayColor = (day: number) => {
        const today = new Date();
        const compareDate = new Date(currentYear, currentMonth, day);

        // If date has been a selected date
        if (innerValue && innerValue.toDateString() === compareDate.toDateString()) {
            return 'bg-primary text-white';
        }

        // if date is today
        if (today.toDateString() === compareDate.toDateString()) {
            return 'bg-surface text-body hover:bg-primary hover:text-white';
        }

        // Past Date
        if (today.getTime() > compareDate.getTime()) {
            return 'text-body-light hover:bg-primary hover:text-white';
        }

        return 'text-body hover:bg-primary hover:text-white';
    };

    const initCalendar = () => {
        if (innerValue) {
            setCurrentMonth(innerValue.getMonth());
            setCurrentYear(innerValue.getFullYear());
            setCurrentHour(innerValue.getHours());
            setCurrentMinute(innerValue.getMinutes());
        } else {
            const today = new Date();
            setCurrentMonth(today.getMonth());
            setCurrentYear(today.getFullYear());
            setCurrentHour(today.getHours());
            setCurrentMinute(today.getMinutes());

            let output = moment(today).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toDate();
            handleSelectDate(output);
        }

        setMounted(true);
        getDays();
    };

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    const handleMoveBackOneMonth = () => {
        const newMonth = currentMonth - 1;

        if (newMonth === -1) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(newMonth);
        }
    };

    const handleMoveForwardOneMonth = () => {
        const newMonth = currentMonth + 1;

        if (newMonth === 12) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(newMonth);
        }
    };

    const handleDateClick = (day: number) => {
        const selectedDate = new Date(currentYear, currentMonth, day);
        handleSelectDate(selectedDate);
    };

    // =========================================================================
    // EFFECTS
    // =========================================================================
    useEffect(() => {
        getDays();
    }, [currentMonth, currentYear]);

    useEffect(() => {
        if (mounted) {
            const date = moment(innerValue).set({ hour: currentHour, minute: currentMinute }).toDate();
            handleSelectDate(date);
        }
    }, [currentHour, currentMinute]);

    useEffect(() => {
        initCalendar();
    }, []);

    useEffect(() => {
        if (mounted && innerValue) {
            console.log('date...', innerValue);
            setCurrentMonth(innerValue.getMonth());
            setCurrentYear(innerValue.getFullYear());
            setCurrentHour(innerValue.getHours());
            setCurrentMinute(innerValue.getMinutes());
        }
    }, [innerValue]);

    return (
        <div className="absolute bg-white mt-2 p-4 rounded shadow-xl w-72 z-50">
            {/* TOP PART OF CALENDAR PICKER */}
            <div className="flex items-center justify-between mb-2">
                <div>
                    <span className="font-bold text-heading text-lg">{MONTH_NAMES[currentMonth]}</span>
                    <span className="font-normal ml-1 text-heading text-lg">{currentYear}</span>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        className="cursor-pointer duration-100 ease-in-out flex h-6 items-center justify-center p-1 rounded-full text-body text-sm transition w-6 hover:bg-surface"
                        onClick={handleMoveBackOneMonth}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                        type="button"
                        className="cursor-pointer duration-100 ease-in-out flex h-6 items-center justify-center p-1 rounded-full text-body text-sm transition w-6 hover:bg-surface"
                        onClick={handleMoveForwardOneMonth}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>

            {/* DAY SECTION */}
            <div className="-mx-1 flex flex-wrap mb-3">
                {DAYS.map(day => {
                    return (
                        <div style={{ width: ' 14.26%' }} className="px-1" key={day}>
                            <div className="font-medium text-center text-heading text-xs">{day}</div>
                        </div>
                    );
                })}
            </div>

            {/*  DATE NUMBER SECTION */}
            <div className="-mx-1 flex flex-wrap">
                {blankdays.map(day => (
                    <div key={day} style={{ width: ' 14.28%' }} className="p-1 text-center text-sm" />
                ))}

                {days.map(day => {
                    return (
                        <div
                            key={day}
                            style={{ width: ' 14.28%' }}
                            className="flex items-center justify-center mb-1 px-1"
                        >
                            <div
                                onClick={() => handleDateClick(day)}
                                className={`cursor-pointer duration-100 ease-in-out rounded-full w-6 h-6 text-center text-sm transition flex items-center justify-center ${determineDayColor(
                                    day,
                                )}`}
                            >
                                {day}
                            </div>
                        </div>
                    );
                })}
            </div>

            {datetime && (
                <React.Fragment>
                    <div className="w-full h-px my-4 bg-surface" />
                    <section className="mt-2">
                        <div className="flex justify-center items-center">
                            <NumberPicker min={0} max={24} number={currentHour} setNumber={setCurrentHour} />
                            <span className="font-bold mx-2 text-xl">:</span>
                            <NumberPicker min={0} max={60} number={currentMinute} setNumber={setCurrentMinute} />
                        </div>
                    </section>
                </React.Fragment>
            )}

            {isInvalid && (
                <div
                    className="absolute w-full h-full top-0 left-0 flex items-center backdrop-blur-sm justify-center"
                    style={{ background: 'rgba(240,240,240,0.7)' }}
                >
                    <p className=" text-lg tracking-wide text-body">Invalid Date</p>
                </div>
            )}
        </div>
    );
};

const NumberPicker = ({
    min,
    max,
    number,
    setNumber,
}: {
    min: number;
    max: number;
    number: number;
    setNumber: any;
}) => {
    const handleInputChange = e => {
        setNumber(e.target.value);
    };

    const handleTimeUp = () => {
        const newValue = number + 1;
        setNumber(newValue > max ? min : newValue);
    };

    const handleTimeDown = () => {
        const newValue = number - 1;
        setNumber(newValue < min ? max : newValue);
    };

    const pad = (number: number) => {
        var s = String(number);
        while (s.length < 2) {
            s = '0' + s;
        }
        return s;
    };

    return (
        <div className="flex flex-col flex-0">
            <FontAwesomeIcon icon={faChevronUp} onClick={handleTimeUp} className="cursor-pointer text-body" />
            <input
                className="border border-surface p-2 rounded w-12 text-center text-body"
                value={pad(number)}
                onChange={handleInputChange}
            />
            <FontAwesomeIcon icon={faChevronDown} onClick={handleTimeDown} className="cursor-pointer text-body" />
        </div>
    );
};

export default DatePicker;
