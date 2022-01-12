// Generated with util/create-component.js
export interface IDropdownEntry {
    title: string;
    icon?: string;
    action: () => void;
}

export interface DropdownMenuProps {
    open: boolean;
    schema: IDropdownEntry[];
    right?: boolean;
    setter: React.Dispatch<React.SetStateAction<boolean>>;
}
