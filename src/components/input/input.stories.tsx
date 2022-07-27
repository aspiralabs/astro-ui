// Generated with util/create-component.js
import React, { useEffect, useState } from 'react';
import Input from './input';
import { Form } from '../form/form';
import { faCog, faUmbrella } from '@fortawesome/free-solid-svg-icons';

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
        <section className="flex flex-col gap-4 bg-card dark:bg-card-dark p-8">
            <Input value={numberInput} setter={handleInput} label="Basic Input" />
            <Input value={numberInput} setter={handleInput} label="Basic Input" borderWidth={2} />
            <Input
                value={numberInput}
                setter={handleInput}
                label="Basic Input"
                className="text-lg h-16"
                borderWidth={4}
            />
        </section>
    );
};
