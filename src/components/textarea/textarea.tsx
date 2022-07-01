// Generated with util/create-component.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { TextAreaProps } from './textarea.types';
import { faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';

const TextArea = ({
    value,
    setter,
    label,
    required = false,
    icon,
    disabled = false,
    className,
    name,
    message,
    rows = 6,
}: TextAreaProps) => {
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

    const handleInputChange = e => setter(e.target.value);

    useEffect(() => {
        if (value) {
            setLabelIsFloating(true);
        } else {
            setLabelIsFloating(false);
        }
    }, [value]);

    const checkLabelStatus = () => {
        if (value) {
            setLabelIsFloating(true);
        } else {
            setLabelIsFloating(false);
        }
    };

    if (!setter) return <p></p>;
    return (
        <fieldset className={`relative w-full ${className}`}>
            <div className="relative ">
                <textarea
                    onFocus={() => setLabelIsFloating(true)}
                    onBlur={checkLabelStatus}
                    ref={field}
                    name={name}
                    disabled={disabled}
                    required={required}
                    value={value}
                    rows={rows}
                    style={{ minHeight: '3rem' }}
                    onChange={handleInputChange}
                    className={` ${
                        disabled ? disabledInput : borderColor
                    } relative  rounded-sm  text-body text-sm px-4 pr-12 focus:outline-none  focus:border-primary  w-full align-middle  font-light tracking-wide py-3`}
                />

                {label && (
                    <label className="font-body font-light  text-body text-sm  transition-all duration-300 pointer-events-none w-full h-full absolute left-0 top-0 px-2">
                        <span
                            className={`absolute transform transitional-all duration-300 px-1.5 ${
                                labelIsFloating ? '-top-2 text-xs bg-white' : 'top-6 -translate-y-1/2'
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

export default TextArea;
