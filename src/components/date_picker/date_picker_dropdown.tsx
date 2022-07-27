import { faChevronLeft, faChevronRight, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useState, useEffect, useRef } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';
import { onClickOutside } from '../../hooks/onClickOutside';

const CalendarDropdown = ({
    innerValue,
    handleSelectDate,
    datetime,
    format,
    isInvalid,
    closeDatePicker,
    setInnerValue,
}: {
    innerValue: Date | null;
    handleSelectDate: any;
    datetime: boolean;
    format: string;
    isInvalid: boolean;
    closeDatePicker: () => void;
    setInnerValue: any;
}) => {
    const [currentMonth, setCurrentMonth] = useState(1);
    const [currentYear, setCurrentYear] = useState(2022);
    const [currentHour, setCurrentHour] = useState(0);
    const [currentMinute, setCurrentMinute] = useState(30);
    const [blankdays, setBlankDays] = useState<number[]>([]);
    const [days, setDays] = useState<number[]>([]);
    const [mounted, setMounted] = useState(false);
    const [currentView, setCurrentView] = useState('picker');
    const [yearPickerIndex, setYearPickerIndex] = useState(0);
    const dropdownRef = useRef(null);

    onClickOutside(dropdownRef, closeDatePicker);

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
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const YEARS_ARRAY = generateArray(1943, 2045);

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
            return 'text-body-hover hover:bg-primary hover:text-white';
        }

        return 'text-body hover:bg-primary hover:text-white dark:text-body-dark';
    };

    const initCalendar = () => {
        console.log('mount value', innerValue);

        if (innerValue) {
            setCurrentMonth(innerValue.getMonth());
            setCurrentYear(innerValue.getFullYear());
            setCurrentHour(innerValue.getHours());
            setCurrentMinute(innerValue.getMinutes());
        } else {
            setInnerValue(
                moment(new Date())
                    .set({ hour: datetime ? 10 : 0, minute: 0, second: 0, millisecond: 0 })
                    .toDate(),
            );
        }

        setMounted(true);
        getDays();
        return;
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
        handleSelectDate(selectedDate, !datetime);
    };

    const toggleMonthPicker = () => {
        if (currentView === 'month_picker') setCurrentView('picker');
        else setCurrentView('month_picker');
    };

    const toggleYearPicker = () => {
        if (currentView === 'year_picker') setCurrentView('picker');
        else {
            // Find index where current year is
            const index = YEARS_ARRAY.findIndex(decade => {
                return decade.find(year => year.value === currentYear);
            });

            setYearPickerIndex(index);
            setCurrentView('year_picker');
        }
    };

    const handleMonthClick = (month: number) => {
        const newDate = moment(innerValue).set('month', month).toDate();
        handleSelectDate(newDate);
        setCurrentView('picker');
    };

    const handleGoPreviousDecade = () => {
        if (yearPickerIndex === 0) return;
        else setYearPickerIndex(yearPickerIndex - 1);
    };

    const handleGoNextDecade = () => {
        if (yearPickerIndex === YEARS_ARRAY.length - 1) return;
        else setYearPickerIndex(yearPickerIndex + 1);
    };

    const handleYearClick = (year: number) => {
        const newDate = moment(innerValue).set('year', year).toDate();
        handleSelectDate(newDate);
        setCurrentView('picker');
    };

    const monthButtonClasses = `text-sm transition py-2 rounded-md text-body dark:text-body-dark font-semibold hover:bg-surface-hover  cursor-pointer`;
    const monthActiveClass = 'text-white bg-primary dark:text-white';

    const yearButtonClasses = `text-sm transition py-2 rounded-md text-body dark:text-body-dark font-semibold bg-surface dark:bg-card-dark hover:bg-surface-hover cursor-pointer`;
    const yearButtonActiveClass = 'text-white bg-primary dark:text-white dark:bg-primary';
    const yearButtonDisabledClasses = `text-sm py-2 rounded-md text-body-light cursor-not-allowed `;

    // =========================================================================
    // EFFECTS
    // =========================================================================
    useEffect(() => {
        getDays();
    }, [currentMonth, currentYear]);

    const updateHour = (newHour: number) => {
        const date = moment(innerValue).set({ hour: newHour }).toDate();
        handleSelectDate(date);
    };

    const updateMinute = (newMinute: number) => {
        const date = moment(innerValue).set({ minute: newMinute }).toDate();
        handleSelectDate(date);
    };

    useEffect(() => {
        initCalendar();
    }, []);

    useEffect(() => {
        if (mounted && innerValue) {
            setCurrentMonth(innerValue.getMonth());
            setCurrentYear(innerValue.getFullYear());
            setCurrentHour(innerValue.getHours());
            setCurrentMinute(innerValue.getMinutes());
        }
    }, [innerValue]);

    if (!mounted) return null;
    return (
        <div
            className="absolute  bg-card dark:bg-card-dark mt-2 p-4 rounded shadow-xl w-72 z-50 top-full"
            ref={dropdownRef}
        >
            {currentView === 'picker' && (
                <div className="h-full w-full">
                    {/* TOP PART OF CALENDAR PICKER */}
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <span
                                onClick={toggleMonthPicker}
                                className="font-bold text-heading dark:text-heading-dark text-lg cursor-pointer"
                            >
                                {MONTH_NAMES[currentMonth]}
                            </span>
                            <span
                                onClick={toggleYearPicker}
                                className="font-normal ml-1 text-heading dark:text-heading-dark text-lg cursor-pointer"
                            >
                                {currentYear}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                className="cursor-pointer duration-100 ease-in-out flex h-6 items-center justify-center p-1 rounded-full text-body dark:text-body-dark text-sm transition w-6 hover:bg-surface dark:hover:bg-surface-dark"
                                onClick={handleMoveBackOneMonth}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <button
                                type="button"
                                className="cursor-pointer duration-100 ease-in-out flex h-6 items-center justify-center p-1 rounded-full text-body dark:text-body-dark text-sm transition w-6 hover:bg-surface"
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
                                    <div className="font-medium text-center text-heading dark:text-body-dark text-xs">
                                        {day}
                                    </div>
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
                            <div className="w-full h-px my-4 bg-gray dark:bg-gray-dark" />
                            <section className="mt-2">
                                <div className="flex justify-center items-center">
                                    <NumberPicker
                                        min={0}
                                        max={24}
                                        number={currentHour}
                                        setNumber={value => updateHour(value)}
                                    />
                                    <span className="font-bold mx-2 text-xl">:</span>
                                    <NumberPicker
                                        min={0}
                                        max={60}
                                        number={currentMinute}
                                        setNumber={value => updateMinute(value)}
                                    />
                                </div>
                            </section>
                        </React.Fragment>
                    )}
                </div>
            )}

            {currentView === 'month_picker' && (
                <div className="h-full w-full">
                    {/* TOP PART OF CALENDAR PICKER */}
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <span
                                onClick={toggleMonthPicker}
                                className="font-bold text-heading dark:text-heading-dark text-lg"
                            >
                                {MONTH_NAMES[currentMonth]}
                            </span>
                        </div>
                    </div>

                    <div className="grid gap-2" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                        {MONTHS.map((month, index) => {
                            if (currentMonth === index) {
                                return (
                                    <button
                                        key={index}
                                        className={overrideTailwindClasses(`${monthButtonClasses} ${monthActiveClass}`)}
                                    >
                                        {month}
                                    </button>
                                );
                            } else {
                                return (
                                    <button
                                        key={index}
                                        className={monthButtonClasses}
                                        onClick={() => handleMonthClick(index)}
                                    >
                                        {month}
                                    </button>
                                );
                            }
                        })}
                    </div>
                </div>
            )}

            {currentView === 'year_picker' && (
                <div className="h-full w-full">
                    {/* TOP PART OF CALENDAR PICKER */}
                    <div className="flex flex-col  justify-between mb-2">
                        <div className="flex justify-between items-center mb-4">
                            <button onClick={() => handleGoPreviousDecade()} className={yearButtonClasses}>
                                <FontAwesomeIcon icon={faChevronLeft} className="text-sm px-4 py-2" />
                            </button>
                            <span
                                className="font-normal ml-1 text-heading dark:text-heading-dark text-lg cursor-pointer"
                                onClick={toggleYearPicker}
                            >
                                {YEARS_ARRAY[yearPickerIndex][0].value} - {YEARS_ARRAY[yearPickerIndex][9].value}
                            </span>
                            <button onClick={() => handleGoNextDecade()} className={yearButtonClasses}>
                                <FontAwesomeIcon icon={faChevronRight} className="text-sm px-4 py-2" />
                            </button>
                        </div>

                        <div className="grid gap-2" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                            {YEARS_ARRAY[yearPickerIndex].map(year => {
                                if (year.value === currentYear) {
                                    return (
                                        <button
                                            className={overrideTailwindClasses(
                                                `${yearButtonClasses} ${yearButtonActiveClass}`,
                                            )}
                                            key={year.value}
                                            onClick={() => handleYearClick(year.value)}
                                        >
                                            {year.value}
                                        </button>
                                    );
                                }

                                if (year.disabled) {
                                    return (
                                        <button className={yearButtonDisabledClasses} disabled key={year.value}>
                                            {year.value}
                                        </button>
                                    );
                                }

                                return (
                                    <button
                                        className={yearButtonClasses}
                                        key={year.value}
                                        onClick={() => handleYearClick(year.value)}
                                    >
                                        {year.value}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
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

// =============================================================================
// ADDITIONAL COMPONENTS
// =============================================================================
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
                className="border-2 border-gray dark:border-gray-dark p-2 rounded w-12 text-center text-body dark:text-body-dark"
                value={pad(number)}
                onChange={handleInputChange}
                style={{ background: 'rgba(0,0,0,0)' }}
            />
            <FontAwesomeIcon icon={faChevronDown} onClick={handleTimeDown} className="cursor-pointer text-body" />
        </div>
    );
};

const generateArray = (start: number, end: number) => {
    const filledArray = new Array(end - start + 1).fill({}).map((_, idx) => ({ value: start + idx, disabled: false }));

    // Add Start Padding
    const startPadding = start % 10;
    for (let i = startPadding; i > 0; i--) {
        filledArray.unshift({
            disabled: true,
            value: filledArray[0].value - 1,
        });
    }

    // Add End Padding
    const endPadding = end % 10;
    for (let i = 0; i < endPadding - 1; i++) {
        filledArray.push({ disabled: true, value: filledArray[filledArray.length - 1].value + 1 });
    }

    return filledArray.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 10);

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
    }, []);
};

export default CalendarDropdown;
