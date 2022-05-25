// Generated with util/create-component.js
import React from 'react';
import Checkbox from './checkbox';
export default {
    title: 'Checkbox',
};

export const BasicCheckbox = () => {
    const [checkboxValue, setCheckboxValue] = React.useState(false);

    return (
        <section className=" p-8">
            <Checkbox value={checkboxValue} setter={setCheckboxValue} label="Check Me" />
        </section>
    );
};
