// Generated with util/create-component.js
import React, { useState } from 'react';
import SelectRefactor from './select';
import { SelectOptionsEntry } from './select.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdjust, faArrowDown, faArrowRight, faArrowUp, faUser } from '@fortawesome/free-solid-svg-icons';
import { Form } from '../form/form';
import Button from '../button/button';

export default {
    title: 'Select',
};

const Test = ({ label }: { label: string }) => {
    return (
        <div className="flex gap-4 items-center">
            <FontAwesomeIcon icon={faAdjust} />
            <p>Hello World</p>
        </div>
    );
};

export const WithSelect = () => {
    const [inputValue, setInputValue] = useState('');
    const [selectValue, setSelectValue] = useState<string>('');

    const options: SelectOptionsEntry[] = [
        {
            value: '1',
            label: 'One',
        },
        {
            value: '2',
            label: 'Two',
        },
        {
            value: '3',
            label: 'Three',
        },
    ];

    const customOptions: SelectOptionsEntry[] = [
        {
            value: '1',
            label: 'One',
            render: <CustomEntry value="Right" icon={faArrowRight} />,
        },
        {
            value: '2',
            label: 'Two',
            render: <CustomEntry value="Down" icon={faArrowDown} />,
        },
        {
            value: '3',
            label: 'Three',
            render: <CustomEntry value="Up" icon={faArrowUp} />,
        },
    ];

    return (
        <div className="flex flex-col">
            <p>Standalone</p>
            <SelectRefactor
                options={options}
                value={selectValue}
                setter={setSelectValue}
                label="Select Value"
                className="my-8"
            />

            <p>Custom Entry</p>
            <SelectRefactor
                options={customOptions}
                value={selectValue}
                setter={setSelectValue}
                label="Select Value"
                className="my-8 rounded-md"
                dropdownClassName="rounded-md"
            />

            <p>In a Form component</p>
            <Form defaultValues={{}} action={(values: any) => console.log(values)}>
                <SelectRefactor options={options} name="formValue" label="Select Value" className="my-8" />
                <Button>Submit</Button>
            </Form>
        </div>
    );
};

const CustomEntry = ({ value, icon }) => {
    return (
        <div className="h-8 flex items-center gap-4">
            <FontAwesomeIcon icon={icon} />
            <span className="text-success font-bold">{value}</span>
        </div>
    );
};
