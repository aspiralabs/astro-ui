// Generated with util/create-component.js
import React, { useEffect, useState } from 'react';
import Input from './input';
import { Form } from '../form/form';
import { faCog } from '@fortawesome/free-solid-svg-icons';

export default {
    title: 'Input',
};

export const BasicInput = () => {
    const [numberInput, setNumberInput] = useState('');

    const handleInput = (values: any) => {
        console.log(values);
        setNumberInput(values);
    };

    return (
        <section className="flex flex-col gap-4">
            <Input value={numberInput} setter={handleInput} label="Basic Input" />

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
