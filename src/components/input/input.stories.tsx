// Generated with util/create-component.js
import React, { useEffect, useState } from 'react';
import Input from './input';

export default {
    title: 'Input',
};

export const BasicInput = () => {
    const [inputValue, setInputValue] = useState('');
    const [numberInput, setNumberInput] = useState(0);

    useEffect(() => {
        const payload = {
            inputValue,
            numberInput,
        };

        console.log(payload);
    }, [inputValue, numberInput]);

    return (
        <section className="flex flex-col gap-4">
            <Input value={inputValue} setter={setInputValue} label="Basic Input" />
            <Input value={numberInput} setter={setNumberInput} cleaveOptions={{ numeral: true }} label="Number Only" />
            To use force the input to be numbers only and also output a javascript number use the cleave option
            numeral=true
        </section>
    );
};
