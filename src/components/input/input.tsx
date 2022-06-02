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
    iconSide = 'right',
    cleaveOptions = {
        blocks: [99999],
        delimiter: '',
    },
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
        if (cleaveOptions?.numeral === true) {
            setter(Number(e.target.rawValue) as any);
        } else {
            setter(e.target.rawValue);
        }
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

    if (!setter) return <p></p>;
    return (
        <fieldset className={`relative w-full ${className}`}>
            <div className="relative ">
                <Cleave
                    onFocus={() => setLabelIsFloating(true)}
                    onBlur={checkLabelStatus}
                    options={cleaveOptions}
                    ref={field}
                    name={name}
                    disabled={disabled}
                    required={required}
                    value={value}
                    onChange={handleInputChange}
                    type={type}
                    className={` ${
                        disabled ? disabledInput : borderColor
                    } relative  rounded-sm  text-body text-sm px-4 pr-12 focus:outline-none focus:border-primary  w-full align-middle h-12 font-light tracking-wide`}
                />

                {label && (
                    <label
                        className={`font-body font-light  text-body text-sm  transition-all duration-300 pointer-events-none w-full h-full absolute ${
                            iconSide === 'left' ? 'left-6' : 'left-0'
                        } top-0 px-2`}
                    >
                        <span
                            className={`absolute transform transitional-all duration-300 px-1.5 ${
                                labelIsFloating ? '-top-2 text-xs bg-white' : 'top-1/2 -translate-y-1/2'
                            } h-auto `}
                        >
                            {label}
                        </span>
                        {required && <span className="text-red-700">*</span>}
                    </label>
                )}

                {icon && (
                    <FontAwesomeIcon
                        icon={icon}
                        className={`-translate-y-1/2 absolute ${
                            iconSide === 'left' ? 'left-4' : 'right-4'
                        } text-body top-1/2 transform z-10`}
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
