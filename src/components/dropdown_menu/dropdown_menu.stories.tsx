// Generated with util/create-component.js
import React, { useState } from 'react';
import DropdownMenu from './dropdown_menu';
import Button from '../button/button';
import { IDropdownEntry } from './dropdown_menu.types';

export default {
    title: 'dropdown_menu',
};

export const BasicDropdown = () => {
    const [userDropwdownOpen, setUserDropdownOpen] = useState(false);

    const handleClick = () => {
        console.log('clicked');
        setUserDropdownOpen(true);
    };

    const userDropwdownSchema: IDropdownEntry[] = [
        {
            title: 'My Profile',
            icon: 'fa-light fa-user',
            action: () => alert('clicked'),
        },
        {
            title: 'Logout',
            icon: 'fa-light fa-power-off',
            action: () => alert('cliceked'),
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
