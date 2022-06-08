// Generated with util/create-component.js
import React from 'react';

import { BadgeProps } from './badge.types';

const Badge = ({ children, variant = 'primary', className }: BadgeProps) => {
    return (
        <div className={`bg-${variant} inline-flex x rounded-full px-3 bg-opacity-30 py-0.5 truncate ${className} `}>
            <span className={`font-body text-xs text-${variant} `}>{children}</span>
        </div>
    );
};

export default Badge;
