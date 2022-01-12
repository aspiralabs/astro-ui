// Generated with util/create-component.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';

import { InputProps } from './input.types';

const Input: React.FC<InputProps> = ({
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
}) => {
    const [borderColor, setBorderColor] = useState('');
    const disabledInput = `border border-disabled bg-disabled`;
    const field = useRef(null);

    useEffect(() => {
        if (message?.message) {
            let color = 'border ';

            if (message?.type === 'error') color += 'border-danger';
            if (message?.type === 'success') color += 'border-success';

            setBorderColor(color);
        } else {
            setBorderColor('border');
        }
    }, [message]);

    if (!setter) return <p></p>;
    return (
        <fieldset className={`relative w-full ${className}`}>
            {label && (
                <label className="block font-body font-light mb-2 text-body text-sm">
                    {label} {required && <span className="text-red-700">*</span>}
                </label>
            )}

            <div className="relative">
                <input
                    ref={field}
                    name={name}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    value={value}
                    onChange={e => setter(e.target.value)}
                    type={type}
                    className={` ${
                        disabled ? disabledInput : borderColor
                    } relative  rounded-sm  text-body text-sm px-4 pr-12 focus:outline-none focus:border-primary  w-full align-middle h-12 font-light tracking-wide`}
                />
                {icon && (
                    <FontAwesomeIcon
                        icon={icon}
                        className="-translate-y-1/2 absolute right-4 text-body top-1/2 transform z-10"
                    />
                )}
            </div>

            {message?.message && (
                <div className="flex gap-1 items-center py-1">
                    <React.Fragment>
                        {message?.type === 'error' && (
                            <i className="fa-circle-exclamation fa-regular mr-2 text-danger" />
                        )}
                        {message?.type === 'success' && <i className="fa-circle-check fa-regular mr-2 text-success" />}
                        <p
                            className={`text-sm font-body ${
                                message?.type === 'error' ? 'text-danger' : 'text-success'
                            } `}
                        >
                            {message?.message}
                        </p>
                    </React.Fragment>
                </div>
            )}
        </fieldset>
    );
};

export default Input;
