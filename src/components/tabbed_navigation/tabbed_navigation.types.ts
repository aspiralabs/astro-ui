// Generated with util/create-component.js
export interface TabContentProps {
    children: React.ReactElement;
    index: number;
    title: string;
    onMount?: () => void;
}

export interface TabbedNavigationProps {
    current: number;
    setter: React.Dispatch<React.SetStateAction<number>>;
    children: React.ReactElement<TabContentProps>[];
}
