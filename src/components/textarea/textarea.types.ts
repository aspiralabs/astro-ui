import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { Dispatch, SetStateAction } from 'react';
import { IFormMessage } from '../form/form.types';
import { CleaveOptions } from 'cleave.js/options';

// Generated with util/create-component.js
export interface TextAreaProps {
    value?: string | number;
    setter?: Dispatch<SetStateAction<string>> | Dispatch<SetStateAction<number>>;
    label?: string;
    required?: boolean;
    icon?: IconDefinition;
    className?: string;
    disabled?: boolean;
    placeholder?: string;
    name?: string;
    message?: IFormMessage;
    rows?: number;
}
