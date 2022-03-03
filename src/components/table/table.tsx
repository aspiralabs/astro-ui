/* eslint-disable react/jsx-key */
import {
    faAnglesLeft,
    faAnglesRight,
    faAngleLeft,
    faAngleRight,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Text from '../text/text';
import { useEffect, useState } from 'react';
import { HeaderGroup, useAsyncDebounce, useGlobalFilter, usePagination, useTable } from 'react-table';

import Input from '../input/input';
import { TableDataObject, TableProps } from './table.types';
import React from 'react';

// =============================================================================
// CONST
// =============================================================================
const pageSizeOptions = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 30, label: '30' },
];

// =============================================================================
// TABLE
// =============================================================================
const Table = ({
    data,
    exportable = false,
    searchable = false,
    paginated = false,
    headerComponent,
    footerComponent,
    loading,
}: TableProps) => {
    if (loading) {
        return <LoadingTable data={data} headerComponent={headerComponent} />;
    } else {
        if (data?.rows.length === 0) {
            return <DatalessTable data={data} headerComponent={headerComponent} />;
        } else {
            return (
                <TableRender
                    data={data}
                    exportable={exportable}
                    searchable={searchable}
                    paginated={paginated}
                    headerComponent={headerComponent}
                    footerComponent={footerComponent}
                />
            );
        }
    }
};

// =============================================================================
// LOADING TABLE
// =============================================================================
interface LoadingTable {
    data: TableDataObject;
    headerComponent: React.ReactNode;
}

const LoadingTable = ({ data, headerComponent }: LoadingTable) => {
    const circleCommonClasses = 'h-2.5 w-2.5 bg-body rounded-full';

    const tableInstance = useTable(
        { columns: data?.header, data: data?.rows, initialState: { pageIndex: 0 } },
        useGlobalFilter,
        usePagination,
    );

    const { headerGroups } = tableInstance;

    return (
        <div>
            <div className="flex items-center mb-4">
                <span className="flex-1"></span>
                {/* {exportable && <TrackButton>Export</TrackButton>} */}
                {headerComponent}
            </div>
            <table className="font-body text-sm w-full">
                <thead className="text-left text-title">
                    {
                        // Loop over the header rows
                        headerGroups.map((headerGroup: HeaderGroup) => (
                            // Apply the header row props
                            <tr
                                {...headerGroup.getHeaderGroupProps()}
                                className="border-b border-surface-dark border-t"
                            >
                                {
                                    // Loop over the headers in each row
                                    headerGroup.headers.map(column => (
                                        // Apply the header cell props
                                        <th {...column.getHeaderProps()} className="px-3 py-3">
                                            {
                                                // Render the header
                                                column.render('header')
                                            }
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
            </table>

            <div className="border-b border-surface-dark text-body">
                <div className="my-8">
                    <div className="flex justify-center">
                        <div className="flex">
                            <div className={`${circleCommonClasses} mr-2 animate-bounce`}></div>
                            <div className={`${circleCommonClasses} mr-2 animate-bounce200`}></div>
                            <div className={`${circleCommonClasses} animate-bounce400`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// =============================================================================
// NO DATA TABLE
// =============================================================================
interface DatalessTable {
    data: TableDataObject;
    headerComponent: React.ReactNode;
}

const DatalessTable: React.FC<DatalessTable> = ({ data, headerComponent }) => {
    const tableInstance = useTable(
        { columns: data?.header, data: data?.rows, initialState: { pageIndex: 0 } },
        useGlobalFilter,
        usePagination,
    );

    const { headerGroups } = tableInstance;

    return (
        <div>
            <div className="flex items-center mb-4">
                <span className="flex-1"></span>
                {/* {exportable && <TrackButton>Export</TrackButton>} */}
                {headerComponent}
            </div>
            <table className="font-body text-sm w-full">
                <thead className="text-left text-title">
                    {
                        // Loop over the header rows
                        headerGroups.map((headerGroup: HeaderGroup) => (
                            // Apply the header row props
                            <tr
                                {...headerGroup.getHeaderGroupProps()}
                                className="border-b border-surface-dark border-t"
                            >
                                {
                                    // Loop over the headers in each row
                                    headerGroup.headers.map(column => (
                                        // Apply the header cell props
                                        <th {...column.getHeaderProps()} className="px-3 py-3">
                                            {
                                                // Render the header
                                                column.render('header')
                                            }
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
            </table>

            <div className="text-body">
                <div className="border-b border-surface-dark p-4 text-center">
                    <p>No Data!</p>
                </div>
            </div>
        </div>
    );
};

// =============================================================================
// TABLE RENDER COMPONENT
// =============================================================================
interface TableRenderProps {
    data: TableDataObject;
    footerComponent?: React.ReactNode;
    headerComponent?: React.ReactNode;
    exportable: boolean;
    searchable: boolean;
    paginated: boolean;
}

const TableRender: React.FC<TableRenderProps> = ({
    data,
    headerComponent,
    searchable,
    paginated,
    exportable,
    footerComponent,
}) => {
    const [paginationStatusText, setPaginationStatusText] = useState('');

    const tableInstance = useTable(
        { columns: data?.header, data: data?.rows, initialState: { pageIndex: 0 } },
        useGlobalFilter,
        usePagination,
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        page,
        prepareRow,
        nextPage,
        previousPage,
        setPageSize,
        gotoPage,
        pageCount,
        pageOptions,
        setGlobalFilter,
        state,
    } = tableInstance;

    useEffect(() => {
        console.log('page index changed');

        const TOTAL_ENTRIES = rows.length;
        const CURRENT_INDEX = state.pageIndex;
        const PAGE_SIZE = state.pageSize;
        const STARTING_COUNT = (CURRENT_INDEX + 1) * PAGE_SIZE - PAGE_SIZE + 1;
        const ENDING_COUNT =
            (CURRENT_INDEX + 1) * PAGE_SIZE > TOTAL_ENTRIES ? TOTAL_ENTRIES : (CURRENT_INDEX + 1) * PAGE_SIZE;

        const TEXT = `Showing ${STARTING_COUNT} to ${ENDING_COUNT} of ${TOTAL_ENTRIES} entries`;
        setPaginationStatusText(TEXT);
    }, [state.pageIndex]);

    return (
        <div>
            <div className="flex items-center mb-4">
                <div>
                    {searchable && (
                        <GlobalFilter
                            // preGlobalFilteredRows={preGlobalFilteredRows}
                            globalFilter={state.globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
                    )}
                </div>
                <span className="flex-1"></span>
                {/* {exportable && <TrackButton>Export</TrackButton>} */}
                {headerComponent}
            </div>
            <table {...getTableProps()} className="font-body text-sm w-full">
                <thead className="text-left text-title">
                    {
                        // Loop over the header rows
                        headerGroups.map((headerGroup: HeaderGroup) => (
                            // Apply the header row props
                            <tr
                                {...headerGroup.getHeaderGroupProps()}
                                className="border-b border-surface-dark border-t"
                            >
                                {
                                    // Loop over the headers in each row
                                    headerGroup.headers.map((column, index) => (
                                        // Apply the header cell props
                                        <th
                                            {...column.getHeaderProps()}
                                            className="px-3 py-3"
                                            style={{
                                                width: data.header[index]?.width ? data.header[index]?.width : 'auto',
                                            }}
                                        >
                                            {
                                                // Render the header
                                                column.render('header')
                                            }
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                {/* Apply the table body props */}
                <tbody {...getTableBodyProps()} className="text-body w-full">
                    {
                        // Loop over the table rows
                        page.map(row => {
                            // Prepare the row for display
                            prepareRow(row);
                            return (
                                // Apply the row props
                                <tr {...row.getRowProps()} className="border-b border-surface-dark max-w-full">
                                    {
                                        // Loop over the rows cells
                                        row.cells.map(cell => {
                                            // Apply the cell props
                                            return (
                                                <td {...cell.getCellProps()} className="px-3 py-3">
                                                    {
                                                        // Render the cell contents
                                                        cell.render('Cell')
                                                    }
                                                </td>
                                            );
                                        })
                                    }
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>

            {footerComponent}

            {paginated && (
                <div className="flex items-center justify-between mt-4 px-4">
                    <p className="text-body text-xs">{paginationStatusText}</p>

                    <div className="flex gap-4 items-center">
                        <FontAwesomeIcon
                            icon={faAnglesLeft}
                            onClick={() => gotoPage(0)}
                            className="cursor-pointer text-xs"
                        />
                        <FontAwesomeIcon
                            icon={faAngleLeft}
                            onClick={() => previousPage()}
                            className="cursor-pointer text-xs"
                        />

                        <Text className="flex text-xs">
                            {state.pageIndex + 1} of {pageOptions.length}
                        </Text>

                        <FontAwesomeIcon
                            icon={faAnglesRight}
                            onClick={() => nextPage()}
                            className="cursor-pointer text-xs"
                        />
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            onClick={() => gotoPage(pageCount - 1)}
                            className="cursor-pointer text-xs"
                        />

                        <div>
                            {/* <DropdownSelect
                                value={state.pageSize ? state.pageSize : 10}
                                setter={(value: number) => setPageSize(value)}
                                options={pageSizeOptions}
                                searchable={false}
                            /> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// =============================================================================
// GLOBAL FUNCTION
// =============================================================================
interface GlobalFilterProps {
    globalFilter: string;
    setGlobalFilter: (filterValue: string) => void;
}

const GlobalFilter: React.FC<GlobalFilterProps> = ({ globalFilter, setGlobalFilter }) => {
    const [value] = useState(globalFilter);
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        // eslint-disable-next-line react/jsx-no-undef
        <Input value={value} setter={value => onChange(value)} icon={faMagnifyingGlass} />
    );
};

export default Table;
