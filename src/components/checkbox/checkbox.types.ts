import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface CheckboxProps {
    value?: boolean;
    setter?: Dispatch<SetStateAction<boolean>>;
    label?: string;
    name?: string;
    disabled?: boolean;
    className?: string;
    variant?: string;
    checkedVariant?: string;
}
