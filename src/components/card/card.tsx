// Generated with util/create-component.js
import React from 'react';

import { CardProps } from './card.types';

const Card: React.FC<CardProps> = ({ children, className }) => {
    // Checks if a custom bg || shadow was passed in
    const background = className?.includes('bg') ? '' : 'bg-white';
    const shadow = className?.includes('shadow') ? '' : 'shadow-none';
    const colspan = className?.includes('col-span') ? '' : 'col-span-12';
    const padding = className?.includes('p-') ? '' : 'p-4';

    return <div className={`${padding} ${background} ${colspan} ${shadow} ${className} rounded`}>{children}</div>;
};

export default Card;
