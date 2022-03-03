import React from 'react';
import { faCalendar, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { DatePickerProps } from './date_picker.types';

const DatePicker = ({ value, setter, name, label, placeholder = '', className }: DatePickerProps) => {
    // =========================================================================
    // STATES
    // =========================================================================
    const [menuOpen, setMenuOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(1); // 0-11
    const [currentYear, setCurrentYear] = useState(2022);
    const [blankdays, setBlankDays] = useState<number[]>([]);
    const [days, setDays] = useState<number[]>([]);
    const [innerValue, setInnerValue] = useState<Date | null>(null);

    const field = useRef(null);
    const isMobile = false;

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

    const isValidDate = (value: any) => {
        const dateWrapper = new Date(value);
        return !isNaN(dateWrapper.getDate());
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
        // Check if a valid date passed through if not set to today
        if (value && isValidDate(value)) {
            const currentDate = new Date(value);

            setCurrentMonth(currentDate.getMonth());
            setCurrentYear(currentDate.getFullYear());
        } else {
            const today = new Date();

            setCurrentMonth(today.getMonth());
            setCurrentYear(today.getFullYear());
        }

        getDays();
    };

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
        setInnerValue(selectedDate);
        setMenuOpen(false);
    };

    const toggleCalendar = () => {
        if (menuOpen) {
            setMenuOpen(!menuOpen);
        } else {
            initCalendar();
            setMenuOpen(!menuOpen);
        }
    };

    // =========================================================================
    // EFFECT
    // =========================================================================

    useEffect(() => {
        getDays();
    }, [currentMonth, currentYear]);

    useEffect(() => {
        setter && innerValue && setter(innerValue);
    }, [innerValue]);

    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <fieldset className="relative w-full">
            <label className="block font-body font-light mb-2 text-body text-sm">{label}</label>

            <div className="relative">
                {isMobile && (
                    <input
                        type="date"
                        name={name}
                        placeholder={placeholder}
                        className={`appearance-none bg-white border border-surface-dark  flex-1 h-12 pr-1 px-4 text-body text-sm w-full ${className}`}
                    ></input>
                )}
                {!isMobile && (
                    <input
                        value={innerValue ? innerValue.toLocaleDateString() : placeholder}
                        ref={field}
                        name={name}
                        placeholder={placeholder}
                        onClick={toggleCalendar}
                        className={`appearance-none border relative  rounded-sm  text-body border-surface-dark text-sm px-4 pr-12 focus:outline-none focus:border-primary  w-full align-middle h-12 font-light tracking-wide ${className}`}
                    />
                )}

                <FontAwesomeIcon
                    icon={faCalendar}
                    onClick={toggleCalendar}
                    className="-translate-y-1/2 absolute cursor-pointer right-4 text-body top-1/2 transform z-10"
                />
            </div>

            {/* DROP DOWN */}

            {menuOpen && (
                <div className="absolute bg-white mt-2 p-4 rounded shadow-xl w-72 z-50">
                    {/* TOP PART OF CALENDAR PICKER */}
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <span className="font-bold text-title text-lg">{MONTH_NAMES[currentMonth]}</span>
                            <span className="font-normal ml-1 text-title text-lg">{currentYear}</span>
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
                                    <div className="font-medium text-center text-title text-xs">{day}</div>
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
                </div>
            )}
        </fieldset>
    );
};

export default DatePicker;
