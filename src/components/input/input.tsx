// Generated with util/create-component.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { InputProps } from './input.types';
import { overrideTailwindClasses } from 'tailwind-override';

const Input = ({
    value,
    setter,
    label,
    required = false,
    icon,
    type = 'text',
    disabled = false,
    placeholder,
    className,
    name,
    message,
    iconSide = 'right',
    borderWidth = 1,
    ...rest
}: InputProps) => {
    const [borderColor, setBorderColor] = useState('');
    const field = useRef(null);
    const [labelIsFloating, setLabelIsFloating] = useState(false);
    const borderWidthString = borderWidth > 1 ? `-${borderWidth}` : '';

    useEffect(() => {
        if (message?.message) {
            let color = 'border-2 ';

            if (message?.type === 'error') color += 'border-error';
            else if (message?.type === 'success') color += 'border-success';
            else color += 'border-gray dark:border-gray-dark';

            setBorderColor(color);
        } else {
            setBorderColor('border-2 border-gray dark:border-gray-dark');
        }
    }, [message]);

    const handleInputChange = e => {
        let rawValue = e.target.value;
        setter(rawValue);
    };

    useEffect(() => {
        if (value || value === 0) {
            setLabelIsFloating(true);
        } else {
            setLabelIsFloating(false);
        }
    }, [value]);

    const checkLabelStatus = () => {
        if (value || value === 0) {
            setLabelIsFloating(true);
        } else {
            setLabelIsFloating(false);
        }
    };

    const handleFocus = () => {
        setLabelIsFloating(true);
    };

    if (!setter) return <p></p>;
    return (
        <React.Fragment>
            <div
                className={overrideTailwindClasses(
                    `rounded-md relative w-full h-12 flex  border-gray dark:border-gray-dark text-body dark:text-body text-sm font-light tracking-wide  ${className} px-0`,
                )}
            >
                {/* START: OUTLINE CONTAINER ===================================== */}
                <div
                    style={{
                        borderRadius: 'inherit',
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        borderColor: 'inherit',
                    }}
                    className={`w-4 border${borderWidthString} border-r-0 h-full rounded-inherit`}
                />

                <div
                    style={{
                        borderRadius: 0,
                        borderColor: 'inherit',
                    }}
                    className={`h-full border${borderWidthString} ${
                        labelIsFloating ? 'border-t-0' : `border-t${borderWidthString}`
                    } border-r-0 border-l-0 w-auto px-1 relative  transition-all duration-100`}
                >
                    <span className="opacity-0">{label}</span>
                    <span
                        className={`transform   transition-all duration-300 absolute left-0  ${
                            labelIsFloating
                                ? '-top-2 text-xs text-center w-full '
                                : '-translate-y-1/2 top-1/2 text-center w-full'
                        }`}
                    >
                        {label}
                    </span>
                </div>

                <div
                    style={{
                        borderRadius: 'inherit',
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderColor: 'inherit',
                    }}
                    className={`w-8  border${borderWidthString} border-l-0 h-full rounded-inherit flex-1`}
                />
                {/* END: OUTLINE CONTAINER ===================================== */}

                <div className=" flex-1 absolute top-0 left-0  w-full h-full px-6">
                    <input
                        onFocus={handleFocus}
                        onBlur={checkLabelStatus}
                        ref={field}
                        name={name}
                        disabled={disabled}
                        required={required}
                        value={value}
                        onChange={handleInputChange}
                        type={type}
                        style={{ background: 'rgba(0,0,0,0)' }}
                        className={`w-full align-middle h-full outline-none `}
                        {...rest}
                    />

                    {icon && (
                        <FontAwesomeIcon
                            icon={icon}
                            className={`-translate-y-1/2 absolute text-base ${
                                iconSide === 'left' ? 'left-4' : 'right-4'
                            } text-body top-1/2 transform z-10`}
                        />
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Input;
