// Generated with util/create-component.js
import React, { useState } from 'react';
import DropdownMenu from './menu';
import Button from '../button/button';
import { DropdownEntry } from './menu.types';

export default {
    title: 'Menu',
};

export const BasicMenu = () => {
    const [userDropwdownOpen, setUserDropdownOpen] = useState(false);

    const handleClick = () => {
        console.log('clicked');
        setUserDropdownOpen(true);
    };

    const userDropwdownSchema: DropdownEntry[] = [
        {
            title: 'My Profile',
            action: () => alert('clicked'),
        },
        {
            title: 'Logout',
            action: () => alert('clicked'),
        },
    ];

    return (
        <div>
            <Button variant="primary" onClick={handleClick} className="relative">
                Click Me
                <DropdownMenu open={userDropwdownOpen} setter={setUserDropdownOpen} schema={userDropwdownSchema} />
            </Button>
        </div>
    );
};
