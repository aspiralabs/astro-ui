// Generated with util/create-component.js
import React, { useState } from 'react';

import { TableProps, TableRenderProps, DatalessTable, GlobalFilterProps } from './table.types';
import { HeaderGroup, useAsyncDebounce, useGlobalFilter, usePagination, useTable } from 'react-table';
import { Input } from '../..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from '../select/select';

const pageSizeOptions = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 30, label: '30' },
];

// =============================================================================
// EXPORTED TABLE
// =============================================================================
const Table: React.FC<TableProps> = ({
    data,
    exportable = false,
    searchable = false,
    paginated = false,
    headerComponent,
}) => {
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
            />
        );
    }
};

// =============================================================================
// HELPER THINGS
// =============================================================================
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
                                className="border-b border-borderPrimary border-t"
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
                <div className="border-b border-borderPrimary p-4 text-center">
                    <p>No Data!</p>
                </div>
            </div>
        </div>
    );
};

const TableRender: React.FC<TableRenderProps> = ({ data, headerComponent }) => {
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

    return (
        <div>
            <div className="flex items-center mb-4">
                <GlobalFilter
                    // preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
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
                                className="border-b border-borderPrimary border-t"
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
                {/* Apply the table body props */}
                <tbody {...getTableBodyProps()} className="text-body w-full">
                    {
                        // Loop over the table rows
                        page.map(row => {
                            // Prepare the row for display
                            prepareRow(row);
                            return (
                                // Apply the row props
                                <tr {...row.getRowProps()} className="border-b border-borderPrimary max-w-full">
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

            <div className="flex items-center justify-between mt-4 px-4">
                <p className="text-body-light text-xs">
                    Showing {(state.pageIndex + 1) * state.pageSize - state.pageSize + 1} to{' '}
                    {(state.pageIndex + 1) * state.pageSize} of {rows.length} entries
                </p>

                <div className="flex gap-4 items-center">
                    {/* <FontAwesomeIcon
                        icon={faChevronDoubleLeft}
                        onClick={() => gotoPage(0)}
                        className="cursor-pointer text-xs"
                    />
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        onClick={() => previousPage()}
                        className="cursor-pointer text-xs"
                    />

                    <Text className="flex text-xs">
                        {state.pageIndex + 1} of {pageOptions.length}
                    </Text>

                    <FontAwesomeIcon
                        icon={faChevronRight}
                        onClick={() => nextPage()}
                        className="cursor-pointer text-xs"
                    />
                    <FontAwesomeIcon
                        icon={faChevronDoubleRight}
                        onClick={() => gotoPage(pageCount - 1)}
                        className="cursor-pointer text-xs"
                    /> */}

                    <div>
                        <Select
                            value={state.pageSize ? state.pageSize : 10}
                            setter={(value: number) => setPageSize(value)}
                            options={pageSizeOptions}
                            searchable={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const GlobalFilter: React.FC<GlobalFilterProps> = ({ globalFilter, setGlobalFilter }) => {
    const [value] = useState(globalFilter);
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        // eslint-disable-next-line react/jsx-no-undef
        <Input value={value || ''} setter={value => onChange(value)} />
    );
};

export default Table;
