// Generated with util/create-component.js
import React from 'react';
import { TabNavigation, TabContent } from './tabbed_navigation';

export default {
    title: 'Tabbed Navigation',
};

export const BasicTabNavigation = () => {
    const [activeTab, setActiveTab] = React.useState(0);

    return (
        <section className="flex flex-col gap-4">
            <TabNavigation current={activeTab} setter={setActiveTab}>
                <TabContent index={0} title={'Tab One'}>
                    <span>Tab One</span>
                </TabContent>
                <TabContent index={1} title={'Tab Two'}>
                    <span>Tab Two</span>
                </TabContent>
            </TabNavigation>
        </section>
    );
};
