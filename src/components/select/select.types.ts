import { Dispatch, SetStateAction } from 'react';
import { IFormMessage } from '../form/form.types';

export interface SelectOptionsEntry {
    [key: string]: string | number;
}
export interface SelectProps {
    label?: string;
    required?: boolean;
    name?: string;
    value?: any;
    setter?: Dispatch<SetStateAction<any>>;
    message?: IFormMessage;
    searchable?: boolean;
    options: SelectOptionsEntry[];
    optionLabel?: string;
    optionValue?: string | number;
    placeholder?: string;
}
