// Generated with util/create-component.js
import { useEffect } from '@storybook/addons';
import React, { useState } from 'react';
import DatePicker from './date_picker';

export default {
    title: 'Date Picker',
};

export const BasicDatePicker = () => {
    // const [value, setValue] = useState<string | null>('2022-06-08T18:00:00.000Z');
    const [value, setValue] = useState<string | null>(null);
    const [valueTwo, setValueTwo] = useState<string | null>(null);

    const handleValue = val => {
        console.log('triggered');
        console.log('val', val);
        setValue(val);
    };

    useEffect(() => {
        console.log('effect value', value);
    }, [value]);

    return (
        <section className="flex gap-8 w-full bg-card dark:bg-card-dark p-8" style={{ height: 800 }}>
            <div className="w-96">
                <p className="mb-8 dark:text-white">Output: {value}</p>
                <DatePicker
                    label="Select Date"
                    value={value}
                    setter={handleValue}
                    className=""
                    datetime
                    borderWidth={2}
                />
            </div>
            <div className="w-96">
                <p className="mb-8 dark:text-white">Output: {valueTwo}</p>
                <DatePicker label="Select Date" value={valueTwo} setter={setValueTwo} borderWidth={2} />
            </div>
        </section>
    );
};
