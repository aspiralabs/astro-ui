// Generated with util/create-component.js

import { Dispatch, SetStateAction } from 'react';

export interface DatePickerProps {
    value?: Date | number | string | null;
    setter?: Dispatch<SetStateAction<string | null>>;
    label?: string;
    className?: string;
    disabled?: boolean;
    placeholder?: string;
    name?: string;
    datetime?: boolean;
    format?: string;
    local?: boolean;
    minYear?: number;
    maxYear?: number;
    borderWidth?: number;
}
