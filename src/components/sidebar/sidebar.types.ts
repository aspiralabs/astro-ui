import { ReactNode } from 'react';

export interface SidebarProps {
    open: boolean;
    setter: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactNode;
    width?: string;
}
