import { Dispatch, SetStateAction } from 'react';
import { IFormMessage } from '../form/form.types';

export interface SelectOptionsEntry {
    label: string;
    value: string;
    render?: JSX.Element;
}
export interface SelectProps {
    options: SelectOptionsEntry[];
    label?: string;
    value?: string;
    setter?: Dispatch<SetStateAction<string>>;
    className?: string;
    name?: string;
}
