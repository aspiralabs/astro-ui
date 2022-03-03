// Generated with util/create-component.js
export interface TableHeader {
    header: string;
    accessor: string;
    width?: string;
}

export interface TableDataObject {
    header: TableHeader[];
    rows: object[];
}

export interface TableProps {
    exportable?: boolean;
    searchable?: boolean;
    paginated?: boolean;
    data: TableDataObject;
    headerComponent?: React.ReactNode;
    footerComponent?: React.ReactNode;
    loading?: boolean;
}

export interface DatalessTableProps {
    data: TableDataObject;
    headerComponent: React.ReactNode;
}

export interface TableRenderProps {
    data: TableDataObject;
    headerComponent: React.ReactNode;
    exportable: boolean;
    searchable: boolean;
    paginated: boolean;
}

export interface GlobalFilterProps {
    globalFilter: string;
    setGlobalFilter: (filterValue: string) => void;
}
