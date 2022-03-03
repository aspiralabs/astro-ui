import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useRef } from 'react';
import { CheckboxProps } from './checkbox.types';

const Checkbox = ({
    value,
    setter,
    label,
    name,
    disabled = false,
    className,
    variant = 'body',
    checkedVariant = 'primary',
}: CheckboxProps) => {
    const ref = useRef<any>(null);

    const handleClick = () => {
        console.log('click');
        setter && setter(!value);
    };

    return (
        <div className={className}>
            <fieldset className="flex gap-2 items-center">
                <div className="h-5 relative w-5">
                    {value && (
                        <FontAwesomeIcon
                            icon={faCheck}
                            className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 pointer-events-none text-white text-xs top-1/2 transform"
                        />
                    )}
                    <input
                        onClick={handleClick}
                        checked={value}
                        name={name}
                        ref={ref}
                        disabled={disabled}
                        type="checkbox"
                        className={`appearance-none border-2 border-${variant} cursor-pointer h-5 rounded-sm w-5 checked:bg-${checkedVariant} checked:border-${checkedVariant} disabled:bg-surface disabled:border-surface disabled:cursor-not-allowed`}
                    />
                </div>
                <span className="font-body font-light text-body text-sm">{label}</span>
            </fieldset>
        </div>
    );
};

export default Checkbox;
