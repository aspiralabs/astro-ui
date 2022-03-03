import { MouseEventHandler } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type ButtonSize = 'sm' | 'normal' | 'lg';
export interface ButtonProps {
    children?: React.ReactNode;
    variant?: string;
    onClick?: any;
    icon?: IconProp;
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    outlined?: boolean;
    loading?: boolean;
    dropdown?: boolean;
    type?: 'button' | 'submit' | 'reset' | undefined;
    active?: boolean;
}
