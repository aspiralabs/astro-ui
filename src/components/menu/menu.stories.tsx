import React, { useState } from 'react';
import DropdownMenu from './menu';
import Button from '../button/button';
import { DropdownEntry } from './menu.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default {
    title: 'Menu',
};

export const BasicMenu = () => {
    const [userDropwdownOpen, setUserDropdownOpen] = useState(false);
    const [customDropdownOpen, setCustomDropdownOpen] = useState(false);

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

    const customDropdown: DropdownEntry[] = [
        {
            title: 'My Profile',
            action: () => setUserDropdownOpen(false),
            render: <CustomEntry value="My Profile" emoji="🦁" />,
        },
        {
            title: 'Logout',
            action: () => alert('clicked'),
            render: <CustomEntry value="Logout" emoji="✌" />,
        },
    ];

    return (
        <div className="flex flex-col gap-8">
            <DropdownMenu open={userDropwdownOpen} setter={setUserDropdownOpen} schema={userDropwdownSchema}>
                <Button onClick={handleClick}>Click Me</Button>
            </DropdownMenu>

            <DropdownMenu
                className="w-96 rounded-xl border mt-4"
                open={customDropdownOpen}
                setter={setCustomDropdownOpen}
                schema={customDropdown}
            >
                <Button onClick={() => setCustomDropdownOpen(true)}>Custom Menu ⭐</Button>
            </DropdownMenu>
        </div>
    );
};

const CustomEntry = ({ value, emoji }) => {
    return (
        <div className="px-4 py-2 flex justify-between w-full cursor-pointer hover:bg-error rounded-xl group items-center">
            <span className="text-primary font-bold flex-1 group-hover:text-white">{value}</span>
            <span className="text-lg">{emoji}</span>
        </div>
    );
};
