// Generated with util/create-component.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { TextAreaProps } from './textarea.types';
import { faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { overrideTailwindClasses } from 'tailwind-override';

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
    borderWidth = 1,
}: TextAreaProps) => {
    const [borderColor, setBorderColor] = useState('');
    const disabledInput = `border border-surface-dark bg-surface-disabled`;
    const field = useRef(null);
    const [labelIsFloating, setLabelIsFloating] = useState(false);
    const borderWidthString = borderWidth > 1 ? `-${borderWidth}` : '';

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
        console.log(field);
        setter(e.target.value);
    };

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
        <div
            className={overrideTailwindClasses(
                `relative w-full flex ${className} rounded-md border-gray dark:border-gray-dark text-body dark:text-body text-sm`,
            )}
        >
            {/* START: OUTLINE CONTAINER ===================================== */}
            <div
                className=" w-full h-full absolute top-0 left-0 pointer-events-none flex "
                style={{
                    borderRadius: 'inherit',
                    borderColor: 'inherit',
                }}
            >
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
                            labelIsFloating ? '-top-2 text-xs text-center w-full ' : 'top-2 text-center w-full'
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
            </div>

            {/* END: OUTLINE CONTAINER ===================================== */}

            <textarea
                onFocus={() => setLabelIsFloating(true)}
                onBlur={checkLabelStatus}
                ref={field}
                name={name}
                disabled={disabled}
                required={required}
                value={value}
                rows={rows}
                style={{ minHeight: '3rem', background: 'rgba(0,0,0,0)' }}
                onChange={handleInputChange}
                className={`text-body dark:text-body text-sm px-4 focus:outline-none w-full align-middle font-light tracking-wide py-3`}
            />
        </div>
    );
};

export default TextArea;
