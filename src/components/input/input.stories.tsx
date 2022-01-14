// Generated with util/create-component.js
import React, { useState } from 'react';
import Input from './input';

export default {
    title: 'input',
};

export const BasicInput = () => {
    const [inputValue, setInputValue] = useState('');

    return (
        <section className="flex flex-col gap-4">
            <Input value={inputValue} setter={setInputValue} />
            <Input value={inputValue} setter={setInputValue} placeholder="Placeholder Example" />
            <Input value={inputValue} setter={setInputValue} label="Label Example" />
        </section>
    );
};
