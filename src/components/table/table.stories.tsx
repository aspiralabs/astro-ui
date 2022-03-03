// Generated with util/create-component.js
import React from 'react';
import Table from './table';
import { TableDataObject } from './table.types';

export default {
    title: 'Table',
};

export const BasicTable = () => {
    const data: TableDataObject = {
        header: [
            {
                header: 'Column One',
                accessor: '1',
            },
            {
                header: 'Column Two',
                accessor: '2',
            },
            {
                header: 'Column Three',
                accessor: '3',
            },
        ],
        rows: [
            {
                '1': 'Row 1 Column 1',
                '2': 'Row 1 Column 2',
                '3': 'Row 1 Column 3',
            },
            {
                '1': 'Row 2 Column 1',
                '2': 'Row 2 Column 2',
                '3': 'Row 2 Column 3',
            },
        ],
    };
    return (
        <section>
            <Table data={data} />
        </section>
    );
};
