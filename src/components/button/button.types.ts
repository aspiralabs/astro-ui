import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type ButtonSize = 'xs' | 'sm' | 'normal' | 'lg';
export interface ButtonProps {
    children?: React.ReactNode;
    variant?: string;
    icon?: IconDefinition;
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    outlined?: boolean;
    loading?: boolean;
    [key: string]: any;
}
