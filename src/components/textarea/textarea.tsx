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

    const borderWidthString = '-2';

    if (!setter) return <p></p>;
    return (
        <div className={overrideTailwindClasses(`relative w-full flex ${className} bg-primary h-full p-8`)}>
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
                className={` ${
                    disabled ? disabledInput : borderColor
                } absolute top-0 left-0 rounded-sm  text-body text-sm px-4 pr-12 focus:outline-none    w-full align-middle  font-light tracking-wide py-3`}
            />
            {/* 
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
                )} */}
        </div>
    );
};

export default TextArea;
