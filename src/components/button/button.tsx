import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonProps } from './button.types';
import { faChevronDown, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { overrideTailwindClasses } from 'tailwind-override';

const Button = ({
    children,
    variant = 'primary',
    icon,
    className,
    disabled = false,
    size = 'normal',
    outlined = false,
    loading = false,
    ...rest
}: ButtonProps) => {
    // =========================================================================
    // COMPUTATIONS
    // =========================================================================
    let calcSize = '';
    let buttonStyles = '';
    let bg = variant;

    switch (size) {
        case 'lg':
            calcSize = 'px-12 py-4 text-lg';
            break;
        case 'normal':
            calcSize = 'px-8 py-3 text-sm';
            break;
        case 'sm':
            calcSize = 'px-4 py-2 text-sm';
            break;
        case 'xs':
            calcSize = 'px-2 py-1 text-xs';
            break;
        default:
            calcSize = '';
    }

    if (outlined) {
        buttonStyles = `border-2 border-${bg} hover:border-${variant}-hover hover:text-${variant}-hover text-${variant} ${
            disabled && `border-${variant}-disabled hover:border-${variant}-disabled cursor-not-allowed`
        }`;
    } else {
        buttonStyles = `bg-${bg} hover:bg-${variant}-hover  text-${variant}-text ${
            disabled && `bg-${variant}-disabled hover:bg-${variant}-disabled cursor-not-allowed`
        }`;
    }

    const finalClasses = `${calcSize} ${buttonStyles}  font-semibold relative transition  capitalize  rounded-md cursor-pointer flex gap-2 items-center  justify-center ${className}`;

    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <button
            className={overrideTailwindClasses(finalClasses)}
            disabled={disabled || loading}
            type={rest.type}
            {...rest}
        >
            {!loading && children}
            {loading && <FontAwesomeIcon icon={faCircleNotch} />}
            {icon && <FontAwesomeIcon icon={icon} />}
        </button>
    );
};

export default Button;
