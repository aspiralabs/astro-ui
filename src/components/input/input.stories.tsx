// Generated with util/create-component.js
import React, { useEffect, useState } from 'react';
import Input from './input';
import { Form } from '../form/form';

export default {
    title: 'Input',
};

export const BasicInput = () => {
    const [inputValue, setInputValue] = useState('');
    const [numberInput, setNumberInput] = useState(0);

    const formDefaultValues = {
        basicInput: '',
        basicNumber: 0,
    };

    const handleFormSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <section className="flex flex-col gap-4">
            <Input value={inputValue} setter={setInputValue} label="Basic Input" />
            <Input value={numberInput} setter={setNumberInput} cleaveOptions={{ numeral: true }} label="Number Only" />
            To use force the input to be numbers only and also output a javascript number use the cleave option
            numeral=true
            {/* <p>Form</p>
            <Form defaultValues={formDefaultValues} action={handleFormSubmit}>
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
