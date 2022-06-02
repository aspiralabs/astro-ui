import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Dispatch, SetStateAction } from 'react';
import { IFormMessage } from '../form/form.types';
import { CleaveOptions } from 'cleave.js/options';

// Generated with util/create-component.js
export interface InputProps {
    value?: string | number;
    setter?: Dispatch<SetStateAction<string>> | Dispatch<SetStateAction<number>>;
    label?: string;
    required?: boolean;
    icon?: IconProp;
    className?: string;
    type?: string;
    disabled?: boolean;
    placeholder?: string;
    name?: string;
    message?: IFormMessage;
    cleaveOptions?: CleaveOptions;
    number?: boolean;
    iconSide?: 'right' | 'left';
}
