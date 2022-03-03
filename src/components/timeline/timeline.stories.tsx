// Generated with util/create-component.js
import React from 'react';
import Timeline from './timeline';

export default {
    title: 'Timeline',
};

export const BasicTimeline = () => {
    const [tabIndex, setTabIndex] = React.useState(0);
    const steps = [
        {
            state: 0,
            info: 'Overview',
            icon: 'sun',
        },
        {
            state: 1,
            info: 'Project Brief',
            icon: 'moon',
        },
        {
            state: 2,
            info: 'Payment',
            icon: 'phone',
        },
    ];

    return (
        <div className="flex flex-col justify-center m-w-3/4 max-h-full p-12">
            <Timeline steps={steps} activeStep={tabIndex} setActiveStep={setTabIndex} className="mb-12" />
        </div>
    );
};
