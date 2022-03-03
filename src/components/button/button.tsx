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
}: ButtonProps) => {
    // =========================================================================
    // COMPUTATIONS
    // =========================================================================
    let calcSize = '';
    let buttonStyles = '';
    let color = 'white';
    let bg = variant;

    switch (size) {
        case 'normal':
            calcSize = 'px-4 py-3';
            break;
        case 'sm':
            calcSize = 'px-3 py-2';
            break;
        default:
            calcSize = 'px-4 py-3';
    }

    if (variant === 'panel') {
        color = 'body';
    }

    if (active) {
        bg = `${variant}-dark`;
    }

    if (outlined) {
        buttonStyles = `border border-${bg} text-${variant} ${disabled && 'opacity-75'}`;
    } else {
        buttonStyles = `bg-${bg} hover:bg-${variant}-light active:bg-${variant}-dark disabled:bg-${variant}-disabled text-${variant}-text ${
            disabled && 'bg-opacity-75'
        }`;
    }

    const finalClasses = `${calcSize} ${buttonStyles} font-body relative transition font-light capitalize  rounded-sm cursor-pointer flex gap-2 items-center text-sm justify-center ${className}`;

    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <button className={finalClasses} onClick={onClick} disabled={disabled || loading} type={type}>
            {!loading && children}
            {loading && <FontAwesomeIcon icon={faCircleNotch} />}
            {icon && <FontAwesomeIcon icon={icon} />}
            {dropdown && <FontAwesomeIcon icon={faChevronDown} />}
        </button>
    );
};

export default Button;
