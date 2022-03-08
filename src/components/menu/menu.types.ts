import { IconProp } from '@fortawesome/fontawesome-svg-core';

// Generated with util/create-component.js
export interface DropdownEntry {
    title: string;
    icon?: IconProp;
    action: () => void;
}

export interface DropdownMenuProps {
    open: boolean;
    schema: DropdownEntry[];
    right?: boolean;
    setter: React.Dispatch<React.SetStateAction<boolean>>;
}