import { IconDefinition } from '@fortawesome/fontawesome-common-types';

// Generated with util/create-component.js
export interface DropdownEntry {
    title: string;
    icon?: IconDefinition;
    action: () => void;
}

export interface DropdownMenuProps {
    open: boolean;
    schema: DropdownEntry[];
    right?: boolean;
    setter: React.Dispatch<React.SetStateAction<boolean>>;
    children: any;
}
