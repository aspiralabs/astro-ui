// Generated with util/create-component.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import Cleave from 'cleave.js/react';
import { InputProps } from './input.types';
import { faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';

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
    cleaveOptions = {
        blocks: [99999],
        delimiter: '',
    },
}: InputProps) => {
    const [borderColor, setBorderColor] = useState('');
    const disabledInput = `border border-disabled bg-disabled`;
    const field = useRef(null);

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
        console.log('input triggered');

        console.log('value', value);
        console.log('raw val', e.target.rawValue);
        console.log(e);

        if (cleaveOptions?.numeral === true) {
            setter(Number(e.target.rawValue) as any);
        } else {
            setter(e.target.rawValue);
        }
    };

    useEffect(() => {
        console.log('trigger');
    }, [value]);

    if (!setter) return <p></p>;
    return (
        <fieldset className={`relative w-full ${className}`}>
            {label && (
                <label className="block font-body font-light mb-2 text-body text-sm">
                    {label} {required && <span className="text-red-700">*</span>}
                </label>
            )}

            <div className="relative">
                <Cleave
                    options={cleaveOptions}
                    ref={field}
                    name={name}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    value={value}
                    onChange={handleInputChange}
                    type={type}
                    className={` ${
                        disabled ? disabledInput : borderColor
                    } relative  rounded-sm  text-body text-sm px-4 pr-12 focus:outline-none focus:border-primary  w-full align-middle h-11 font-light tracking-wide`}
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
            )}
        </fieldset>
    );
};

export default Input;
