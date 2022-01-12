// Generated with util/create-component.js
import React from 'react';

import { BadgeProps } from './badge.types';

const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', className }: IBadgeProps) => {
    return (
        <div className={`bg-${variant} inline-flex x rounded-full px-3 bg-opacity-60 py-0.5 ${className} `}>
            <span className={`font-body text-xs text-${variant}-active`}>{children}</span>
        </div>
    );
};

export default Badge;
