// Generated with util/create-component.js
import React from 'react';
import Radio, { RadioGroup } from './radio';
import Heading from '../heading/heading';
import Button from '../button/button';
import { Form } from '../form/form';
export default {
    title: 'Radio',
};

export const BasicRadio = () => {
    const [checkboxValue, setCheckboxValue] = React.useState(false);
    const [radioGroup, setRadioGroup] = React.useState<string | null>(null);

    const handleFormSubmit = values => {
        console.log(values);
    };

    React.useEffect(() => {
        console.log(radioGroup);
    }, [radioGroup]);

    return (
        <section className=" p-8">
            <Heading className="mb-2">Single Radio</Heading>
            <Radio value={checkboxValue} setter={setCheckboxValue} label="Check Me" />

            <Heading className="mt-8 mb-2">Radio Group</Heading>
            <Form defaultValues={{ yeehawJunction: null }} action={handleFormSubmit}>
                <RadioGroup name="yeehawJunction" className="flex flex-col gap-2 my-4">
                    <Radio name="yes" label="Yes" />
                    <Radio name="no" label="No" />
                </RadioGroup>

                <Button>Submit</Button>
            </Form>
        </section>
    );
};
