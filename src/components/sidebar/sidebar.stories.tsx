// Generated with util/create-component.js
import React from 'react';
import Sidebar from './sidebar';
import Button from '../button/button';

export default {
    title: 'Sidebar',
};

export const BasicSidebar = () => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    return (
        <div>
            <Button onClick={() => setSidebarOpen(true)}>Click To Open Sidebar</Button>
            <Sidebar open={sidebarOpen} setter={setSidebarOpen}>
                Sidebar Content
            </Sidebar>
        </div>
    );
};
