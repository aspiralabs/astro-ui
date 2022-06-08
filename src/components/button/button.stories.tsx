// Generated with util/create-component.js
import { faBackspace, faUser } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Button from './button';

export default {
    title: 'Button',
};

export const BasicButton = () => {
    const handleClick = () => {
        alert('click');
    };

    return (
        <div className="flex gap-4">
            <Button variant="primary" onClick={handleClick}>
                Primary Button
            </Button>
            <Button variant="primary" outlined>
                Outlined Button
            </Button>
            <Button variant="primary" disabled>
                Disabled Button
            </Button>

            <Button type="submit" variant="primary" onClick={handleClick} className="px-48 rounded-full">
                Primary Button
            </Button>
        </div>
    );
};

export const ButtonSizes = () => {
    return (
        <div>
            <div className="flex gap-4 items-end">
                <Button variant="primary" size="xs">
                    Button
                </Button>
                <Button variant="primary" size="sm">
                    Button
                </Button>
                <Button variant="primary" size="normal">
                    Button
                </Button>
                <Button variant="primary" size="lg">
                    Button
                </Button>
                <Button variant="primary" className="px-24 py-4">
                    Custom Size
                </Button>
            </div>
            <div className="flex gap-4 items-end mt-8">
                <Button variant="primary" size="xs" outlined>
                    Button
                </Button>
                <Button variant="primary" size="sm" outlined>
                    Button
                </Button>
                <Button variant="primary" size="normal" outlined>
                    Button
                </Button>
                <Button variant="primary" size="lg" outlined>
                    Button
                </Button>
            </div>
        </div>
    );
};

export const ButtonIcons = () => {
    return (
        <div className="flex gap-4">
            <Button variant="primary" icon={faUser}>
                Icons
            </Button>
            <Button variant="primary" outlined icon={faBackspace}>
                Outlined
            </Button>
        </div>
    );
};

export const ButtonPalette = () => {
    return (
        <div>
            <div>
                <h2 className="text-xl font-semibold my-4">Primary</h2>
                <div className="flex gap-4">
                    <Button variant="primary">Button</Button>
                    <Button variant="primary" outlined>
                        Outlined
                    </Button>
                    <Button variant="primary" disabled>
                        Disabled
                    </Button>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold my-4">Secondary</h2>
                <div className="flex gap-4">
                    <Button variant="secondary">Button</Button>
                    <Button variant="secondary" outlined>
                        Outlined
                    </Button>
                    <Button variant="secondary" disabled>
                        Disabled
                    </Button>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold my-4">Success</h2>
                <div className="flex gap-4">
                    <Button variant="success">Button</Button>
                    <Button variant="success" outlined>
                        Outlined
                    </Button>
                    <Button variant="success" disabled>
                        Disabled
                    </Button>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold my-4">Warning</h2>
                <div className="flex gap-4">
                    <Button variant="warning">Button</Button>
                    <Button variant="warning" outlined>
                        Outlined
                    </Button>
                    <Button variant="warning" disabled>
                        Disabled
                    </Button>
                </div>
            </div>
            <div>
                <h2 className="text-xl font-semibold my-4">Danger</h2>
                <div className="flex gap-4">
                    <Button variant="error">Button</Button>
                    <Button variant="error" outlined>
                        Outlined
                    </Button>
                    <Button variant="error" disabled>
                        Disabled
                    </Button>
                </div>
            </div>
            <div>
                <h2 className="text-xl font-semibold my-4">Gray</h2>
                <div className="flex gap-4">
                    <Button variant="gray">Button</Button>
                    <Button variant="gray" outlined>
                        Outlined
                    </Button>
                    <Button variant="gray" disabled>
                        Disabled
                    </Button>
                </div>
            </div>
        </div>
    );
};
