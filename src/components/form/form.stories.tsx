// Generated with util/create-component.js
import React, { useState } from 'react';
import { Input } from '../..';
import { Form, FormSection } from './form';
import Button from '../button/button';
import { FormAction } from './form.types';
import Select from '../select/select';
import DatePicker from '../date_picker/date_picker';

export default {
    title: 'Form',
};

export const BasicForm = () => {
    const [output, setOutput] = useState('');

    const handleSubmit: FormAction = values => {
        setOutput(JSON.stringify(values));
    };

    const generOptions = [
        {
            value: 'male',
            label: 'Male',
        },
        {
            value: 'female',
            label: 'Female',
        },
        {
            value: 'nonbinary',
            label: 'Non Binary',
        },
    ];

    const defaultValues = {
        firstName: 'asdfas',
        lastName: '',
        address: '',
        city: '',
        zip: '',
        date: null,
    };

    return (
        <section className="bg-gray p-8">
            <Form defaultValues={defaultValues} action={handleSubmit} className="flex flex-col gap-4">
                <Input name="firstName" label="First Name" disabled={true} />
                <Input name="lastName" label="Last Name" />

                <FormSection className="flex gap-4">
                    <Input name="address" label="Address" />
                    <Input name="city" label="City" />
                    <Input name="zip" label="Zip" />
                </FormSection>
                <DatePicker name="date" label="Select Date" />

                <Select options={generOptions} name="testSelect" label="Select Gender" />

                <Button variant="secondary">Submit</Button>
            </Form>

            <section className="mt-8">{output}</section>
        </section>
    );
};
