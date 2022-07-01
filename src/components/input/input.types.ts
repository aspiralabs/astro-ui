import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { Dispatch, SetStateAction } from 'react';
import { IFormMessage } from '../form/form.types';
import { CleaveOptions } from 'cleave.js/options';

// Generated with util/create-component.js
export interface InputProps {
    value?: string | number;
    setter?: Dispatch<SetStateAction<string>> | Dispatch<SetStateAction<number>>;
    label?: string;
    required?: boolean;
    icon?: IconDefinition;
    className?: string;
    type?: string;
    disabled?: boolean;
    placeholder?: string;
    name?: string;
    message?: IFormMessage;
    number?: boolean;
    iconSide?: 'right' | 'left';
    [key: string]: any;
}
