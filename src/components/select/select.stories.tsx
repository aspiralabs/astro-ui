// Generated with util/create-component.js
import React from 'react';
import Select from './select';
import { SelectOptionsEntry } from './select.types';
import SyncSelect from './sync_select';

export default {
    title: 'Select',
};

export const WithSelect = () => {
    const options: SelectOptionsEntry[] = [
        {
            value: 1,
            label: 'Option One',
        },
        {
            value: 2,
            label: 'Option Two',
        },
        {
            value: 3,
            label: 'Option Three',
        },
    ];

    return (
        <div>
            <Select options={options} label="Hello World" />
        </div>
    );
};
