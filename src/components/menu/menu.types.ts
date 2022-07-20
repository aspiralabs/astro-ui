import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// Generated with util/create-component.js
export interface DropdownEntry {
    title: string;
    action: () => void;
    render?: JSX.Element;
}

export interface DropdownMenuProps {
    open: boolean;
    schema: DropdownEntry[];
    right?: boolean;
    setter: React.Dispatch<React.SetStateAction<boolean>>;
    children: any;
    className?: string;
}
