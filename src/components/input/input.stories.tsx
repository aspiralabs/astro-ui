// Generated with util/create-component.js
import React, { useEffect, useState } from 'react';
import Input from './input';
import { Form } from '../form/form';
import { faCog } from '@fortawesome/free-solid-svg-icons';

export default {
    title: 'Input',
};

export const BasicInput = () => {
    const [inputValue, setInputValue] = useState('');
    const [numberInput, setNumberInput] = useState(3.0);

    const handleFormSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <section className="flex flex-col gap-4">
            <Input
                className="w-96 px-4 h-12 rounded-full"
                icon={faCog}
                value={numberInput}
                setter={setNumberInput}
                label="Basic Input"
                required
                cleaveOptions={{
                    prefix: '$',
                    numeral: true,
                }}
            />
            <p>{numberInput}</p>
            To use force the input to be numbers only. Note this still outputs as a string value. If you need to convert
            to a javascript number take into consideration the thousands seperator. `,` and `.` are switched around
            depedening on country. Note: Prefixes are removed from the outputted value. They are simply used for display
            purposes
            {/* <p>Form</p>
            <Form defaultValues={{}} action={handleFormSubmit}>
                <Input name="basicInput" label="Basic Input" />
                <Input
                    name="basicNumber"
                    label="Basic Number"
                    cleaveOptions={{
                        prefix: '$',
                        numeral: true,
                    }}
                />
            </Form> */}
        </section>
    );
};
