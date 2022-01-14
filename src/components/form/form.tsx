// Generated with util/create-component.js
import React, { ReactElement, useState } from 'react';
import Input from '../input/input';
import Select from '../select/select';

import { IFormDataStructure, IFormErrors, IFormProps, IFormSectionProps } from './form.types';

const Form: React.FC<IFormProps> = ({ children, defaultValues, action, validation, className }) => {
    const [formData, setFormData] = useState<IFormDataStructure>(defaultValues);
    const [formErrors, setFormErrors] = useState<IFormErrors>({});
    const [loading, setLoading] = useState(false);

    // =========================================================================
    // HANDLE SUBMIT
    // =========================================================================
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setFormErrors({});
        // setValidationError('');

        if (validation) {
            validation
                .validate(formData, { abortEarly: false })
                .then(() => {
                    action(formData, setLoading);
                })
                .catch(error => {
                    setMessages(error.inner);
                    setLoading(false);
                });
        } else {
            action(formData, setLoading);
        }
    };

    // Function to set all error messages after validation
    const setMessages = (errors: any) => {
        const newFormState: IFormErrors = {};
        errors?.forEach((error: any) => {
            newFormState[error.path] = {
                type: 'error',
                message: error.message,
            };
        });

        setFormErrors(newFormState);
    };

    // =========================================================================
    // CONSTRUCT PROPS
    // =========================================================================
    const isValidFormElement = (item: ReactElement) => {
        if (item.type === Input || item.type === Select) return true;
        else return false;
    };

    // Process All Children
    const processChildren = (child: any) => {
        const item = child as ReactElement;
        const name = child.props?.name;

        // // If an element has children
        if (child.props?.children) {
            // If A Form Section
            if (item.type === FormSection) {
                const subChildren: any = React.Children.map(child.props.children, child => {
                    return processChildren(child);
                });

                return React.createElement('section', { className: child.props.className }, subChildren);
            }

            // If Child is just a regular element just return it
            else {
                return React.cloneElement(child);
            }
        }
        // No Children
        else {
            // Check if If Element is Form Element  and pass proper props
            if (isValidFormElement(item)) {
                return React.cloneElement(child, {
                    key: name,
                    value: formData[name],
                    disabled: loading,
                    message: formErrors[name],
                    loading,
                    setter: (value: any) => setFormData({ ...formData, [name]: value }),
                });
            }

            // Any other Item
            else {
                return React.cloneElement(child);
            }
        }
    };

    // Function called in render
    const childrenWithProps = React.Children.map(children, child => {
        return processChildren(child);
    });

    // =========================================================================
    // RENDER
    // =========================================================================
    return (
        <form className={className} onSubmit={handleSubmit} autoComplete="off">
            {/* {error && <TrackMessage type={'error'} message={error} />} */}

            {/* Wait till FormData is populated so children do not have undefined values */}
            {formData && childrenWithProps}
        </form>
    );
};

// =============================================================================
// FORM SECTION
// =============================================================================
const FormSection = ({ children, className }: IFormSectionProps) => (
    <section className={`${className}`}>{children}</section>
);

export { Form, FormSection };
