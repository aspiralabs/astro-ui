// Generated with util/create-component.js
import React, { useEffect, useState } from 'react';
import TextArea from './textarea';
import { Form } from '../form/form';
import Input from '../input/input';

export default {
    title: 'Text Area',
};

export const BasicTextArea = () => {
    const [inputValue, setInputValue] = useState('');
    const [numberInput, setNumberInput] = useState('');

    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <section className="flex flex-col gap-4">
            <Form defaultValues={{}} action={handleSubmit} className="grid grid-cols-2 gap-8">
                <Input name="input" label="Input Text" />
                <TextArea name="textarea" label="Basic Text Area" />
            </Form>
        </section>
    );
};
