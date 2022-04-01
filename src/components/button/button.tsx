import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonProps } from './button.types';
import { faChevronDown, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const Button = ({
    children,
    variant = 'primary',
    onClick,
    icon,
    className,
    disabled = false,
    size = 'normal',
    outlined = false,
    loading = false,
    dropdown = false,
    type,
    active,
    id,
}: ButtonProps) => {
    // =========================================================================
    // COMPUTATIONS
    // =========================================================================
    let calcSize = '';
    let buttonStyles = '';
    let bg = variant;

    switch (size) {
        case 'lg':
            calcSize = 'px-6 py-3';
            break;
        case 'normal':
            calcSize = 'px-4 py-3 text-sm';
            break;
        case 'sm':
            calcSize = 'px-3 py-2 text-sm';
            break;
        case 'xs':
            calcSize = 'px-2 py-1 text-xs';
            break;
        default:
            calcSize = '';
    }

    if (active) {
        bg = `${variant}-dark`;
    }

    if (outlined) {
        buttonStyles = `border border-${bg} hover:border-${variant}-light hover:text-${variant}-light text-${variant} ${
            disabled && `border-${variant}-disabled hover:border-${variant}-disabled cursor-not-allowed`
        }`;
    } else {
        buttonStyles = `bg-${bg} hover:bg-${variant}-light active:bg-${variant}-dark text-${variant}-text ${
            disabled && `bg-${variant}-disabled hover:bg-${variant}-disabled cursor-not-allowed`
        }`;
    }

    const finalClasses = `${calcSize} ${buttonStyles} font-body relative transition font-light capitalize  rounded-sm cursor-pointer flex gap-2 items-center  justify-center ${className}`;

    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <button className={finalClasses} onClick={onClick} disabled={disabled || loading} type={type} id={id}>
            {!loading && children}
            {loading && <FontAwesomeIcon icon={faCircleNotch} />}
            {icon && <FontAwesomeIcon icon={icon} />}
            {dropdown && <FontAwesomeIcon icon={faChevronDown} />}
        </button>
    );
};

export default Button;
