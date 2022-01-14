// Generated with util/create-component.js
export interface ITableHeader {
    header: string;
    accessor: string;
    width?: string;
}

export interface ITableDataObject {
    header: ITableHeader[];
    rows: object[];
}

export interface TableProps {
    exportable?: boolean;
    searchable?: boolean;
    paginated?: boolean;
    data: ITableDataObject;
    headerComponent?: React.ReactNode;
}

export interface DatalessTable {
    data: ITableDataObject;
    headerComponent: React.ReactNode;
}

export interface TableRenderProps {
    data: ITableDataObject;
    headerComponent: React.ReactNode;
    exportable: boolean;
    searchable: boolean;
    paginated: boolean;
}

export interface GlobalFilterProps {
    globalFilter: string;
    setGlobalFilter: (filterValue: string) => void;
}
