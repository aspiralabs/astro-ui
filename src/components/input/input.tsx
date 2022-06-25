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
    ...rest
}: InputProps) => {
    const [borderColor, setBorderColor] = useState('');
    const disabledInput = `border border-surface-dark bg-surface-disabled`;
    const field = useRef(null);
    const [labelIsFloating, setLabelIsFloating] = useState(false);

    useEffect(() => {
        if (message?.message) {
            let color = 'border ';

            if (message?.type === 'error') color += 'border-error';
            else if (message?.type === 'success') color += 'border-success';
            else color += 'border-surface-dark';

            setBorderColor(color);
        } else {
            setBorderColor('border border-surface-dark');
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
        <div
            className={overrideTailwindClasses(
                `rounded-sm relative w-full h-12 flex flex-col text-body text-sm px-4 font-light tracking-wide ${
                    disabled ? disabledInput : borderColor
                } ${className}`,
            )}
        >
            <div className=" flex-1 relative">
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
                    className={`focus:outline-none focus:border-primary  w-full align-middle h-full `}
                    {...rest}
                />

                {label && (
                    <label
                        className={`font-body font-light  text-body  transition-all duration-300 pointer-events-none w-full h-full absolute ${
                            iconSide === 'left' ? 'left-6' : 'left-0'
                        } top-0`}
                    >
                        <span
                            className={`absolute transform transitional-all duration-300 px-1.5 -left-1.5 ${
                                labelIsFloating ? '-top-2 text-xs bg-white ' : 'top-1/2 -translate-y-1/2'
                            } h-auto `}
                        >
                            {label} {required && <span className="text-error">*</span>}
                        </span>
                    </label>
                )}

                {icon && (
                    <FontAwesomeIcon
                        icon={icon}
                        className={`-translate-y-1/2 absolute ${
                            iconSide === 'left' ? 'left-0' : 'right-0'
                        } text-body top-1/2 transform z-10`}
                    />
                )}
            </div>

            {/* {message?.message && (
                <div className="flex gap-1 items-center py-1">
                    <React.Fragment>
                        {message?.type === 'error' && (
                            <FontAwesomeIcon icon={faExclamation} className="mr-2 text-error" />
                        )}
                        {message?.type === 'success' && (
                            <FontAwesomeIcon icon={faCheck} className="mr-2 text-success" />
                        )}
                        <p
                            className={`text-sm font-body ${
                                message?.type === 'error' ? 'text-error' : 'text-success'
                            } `}
                        >
                            {message?.message}
                        </p>
                    </React.Fragment>
                </div>
            )} */}
        </div>
    );
};

export default Input;
