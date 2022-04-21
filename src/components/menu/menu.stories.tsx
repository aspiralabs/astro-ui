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
        setUserDropdownOpen(true);
    };

    const userDropwdownSchema: DropdownEntry[] = [
        {
            title: 'My Profile',
            action: () => setUserDropdownOpen(false),
        },
        {
            title: 'Logout',
            action: () => alert('clicked'),
        },
    ];

    return (
        <div>
            <DropdownMenu open={userDropwdownOpen} setter={setUserDropdownOpen} schema={userDropwdownSchema}>
                <Button onClick={handleClick}>Click Me</Button>
            </DropdownMenu>
        </div>
    );
};
