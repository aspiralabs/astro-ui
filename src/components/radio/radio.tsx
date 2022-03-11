import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react';
import { useRef } from 'react';
import { RadioProps } from './radio.types';

const Radio = ({
    value,
    setter,
    label,
    name,
    disabled = false,
    className,
    variant = 'body',
    checkedVariant = 'primary',
}: RadioProps) => {
    const ref = useRef<any>(null);

    const handleClick = () => {
        setter && setter(!value);
    };

    return (
        <div className={className}>
            <fieldset className="flex gap-2 items-center">
                <div className="h-5 relative w-5">
                    {value && (
                        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 pointer-events-none bg-white text-xs top-1/2 transform h-2 w-2 rounded-full" />
                    )}
                    <input
                        onClick={handleClick}
                        checked={value}
                        name={name}
                        ref={ref}
                        disabled={disabled}
                        type="radio"
                        className={`appearance-none border-2 border-${variant} cursor-pointer h-5 rounded-full w-5 checked:bg-${checkedVariant} checked:border-${checkedVariant} disabled:bg-surface disabled:border-surface disabled:cursor-not-allowed`}
                    />
                </div>
                <span className="font-body font-light text-body text-sm">{label}</span>
            </fieldset>
        </div>
    );
};

interface RadioGroupProps {
    children: Array<ReactElement<RadioProps>>;
    value?: string | null;
    setter?: Dispatch<SetStateAction<string | null>>;
    name?: string;
    className?: string;
}

export const RadioGroup = ({ className, children, value, setter }: RadioGroupProps) => {
    const [values, setValues] = useState<{ [key: string]: boolean }>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Map out all the children name and make a key and set to false.
        const mapping = {};
        children.forEach(child => (mapping[child.props.name] = false));

        // If a value is passed in, it means it wants that value to be
        // true
        mapping[value] = true;

        // Update States
        setValues(mapping);
        setLoading(false);
    }, []);

    const processRadioSwitch = (name: string, value: boolean) => {
        // Can't unselect the current radio
        if (value === false) return;

        // Make a Copy
        const newValues = { ...values };

        // Set everything to false
        Object.keys(newValues).forEach(value => {
            newValues[value] = false;
        });

        // Set the one value to true
        newValues[name] = value;

        // Update States
        setValues(newValues);
        setter(name);
    };

    const mapChildren = React.Children.map(children, child => {
        return React.cloneElement(child, {
            ...child.props,
            value: values[child.props.name],
            setter: (value: boolean) => processRadioSwitch(child.props.name, value),
        });
    });

    return <div className={className}>{!loading && mapChildren}</div>;
};
export default Radio;
