// Generated with util/create-component.js
import React, { useState } from 'react';
import DatePicker from './date_picker';

export default {
    title: 'Date Picker',
};

export const BasicDatePicker = () => {
    const [value, setValue] = useState('2022-06-08T18:00:00.000Z');
    return (
        <div>
            <p className="mb-8">Output: {value}</p>
            <DatePicker label="Select Date" value={value} setter={setValue} className="" datetime />
        </div>
    );
};
