import { MouseEventHandler } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface ButtonProps {
    children?: any;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    variant?: string;
    outlined?: boolean;
    disabled?: boolean;
    className?: string;
    size?: 'xs' | 'sm' | 'normal' | 'lg';
    icon?: IconProp;
}
