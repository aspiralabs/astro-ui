// Generated with util/create-component.js
import React from 'react';
import { overrideTailwindClasses } from 'tailwind-override';

import { CardProps } from './card.types';

const Card: React.FC<CardProps> = ({ children, className }) => {
    return (
        <div className={overrideTailwindClasses(`bg-card dark:bg-card-dark shadow-none col-span-12 p-4 ${className} `)}>
            {children}
        </div>
    );
};

export default Card;
