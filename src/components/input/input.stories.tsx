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
    const [numberInput, setNumberInput] = useState(3);

    const handleFormSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <section className="flex flex-col gap-4">
            <Input
                className="w-96 px-4 h-12 rounded-full"
                icon={faCog}
                value={inputValue}
                setter={setInputValue}
                label="Basic Input"
                required
            />
            To use force the input to be numbers only and also output a javascript number use the cleave option
            numeral=true
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
