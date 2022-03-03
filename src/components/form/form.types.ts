import { AnyObjectSchema } from 'yup';

export interface IFormMessage {
    type: string;
    message: string;
}

export interface IFormErrors {
    [key: string]: IFormMessage;
}

export interface FormAction {
    (
        formData: object,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        // setError: React.Dispatch<React.SetStateAction<string>>,
    ): void;
}

export interface FormProps {
    children?: React.ReactNode;
    defaultValues: FormDataStructure;
    action: FormAction;
    validation?: AnyObjectSchema;
    className?: string;
}
export interface FormSectionProps {
    children: React.ReactNode;
    className?: string;
}

export interface FormDataStructure {
    [key: string]: string | number | boolean;
}
