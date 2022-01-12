// =============================================================================
// IMPORTS
// =============================================================================
import React from 'react';
import { ButtonProps } from './Button.types';
import { useAstro } from '../astro/astro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// =============================================================================
// RENDER
// =============================================================================
const Button: React.FC<ButtonProps> = props => {
    // =========================================================================
    // PROPS
    // =========================================================================
    let { children, icon, onClick, variant, size = 'normal', outlined = false, disabled = false, className } = props;
    let { AstroConfig } = useAstro();

    // =========================================================================
    // STATICS
    // =========================================================================
    let calcSize = '';
    let buttonStyles = '';
    let rounded = `${AstroConfig.rounded && 'rounded'}`;

    // Calculate Size
    switch (size) {
        case 'xs':
            calcSize = 'px-2 py-2 text-xs';
            break;
        case 'sm':
            calcSize = 'px-3 py-2 text-sm';
            break;
        case 'normal':
            calcSize = 'px-6 py-3';
            break;
        case 'lg':
            calcSize = 'px-8 py-4';
            break;
        default:
            calcSize = 'px-6 py-3';
    }

    // =========================================================================
    // OUTLINED AND DISABLED CALCULATE
    // =========================================================================
    if (outlined) {
        if (disabled) {
            buttonStyles = `border border-${variant}-disabled text-${variant} cursor-not-allowed`;
        } else {
            buttonStyles = `border border-${variant} text-${variant} hover:border-${variant}-active hover:text-${variant}-active`;
        }
    } else {
        if (disabled) {
            buttonStyles = `bg-${variant}-disabled  text-${variant}-text cursor-not-allowed`;
        } else {
            buttonStyles = `bg-${variant} hover:bg-${variant}-hover active:bg-${variant}-active text-${variant}-text`;
        }
    }

    // FINAL CLASS
    let calculatedClass = `${buttonStyles} ${calcSize} transition ${rounded} ${className} flex gap-2 text-sm items-center justify-center relative`;

    // RENDER
    return (
        <button onClick={onClick} data-testid="Button" className={calculatedClass} disabled={disabled}>
            {children}
            {icon && <FontAwesomeIcon icon={icon} />}
        </button>
    );
};

export default Button;
