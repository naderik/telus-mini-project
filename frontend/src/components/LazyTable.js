import React, { useState, useReducer, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import {
    VirtualTableState,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    VirtualTable,
    TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

const VIRTUAL_PAGE_SIZE = 100;
const MAX_ROWS = 50000;
const URL = 'http://localhost:8585/api/contracts';
const getRowId = row => row[0];
const buildQueryString = (skip, take) => `${URL}?skip=${skip}&take=${take}`;

const initialState = {
    rows: [],
    skip: 0,
    requestedSkip: 0,
    take: VIRTUAL_PAGE_SIZE * 2,
    totalCount: 0,
    loading: false,
    lastQuery: '',
};

function reducer(state, { type, payload }) {
    switch (type) {
        case 'UPDATE_ROWS':
            return {
                ...state,
                ...payload,
                loading: false,
            };
        case 'START_LOADING':
            return {
                ...state,
                requestedSkip: payload.requestedSkip,
                take: payload.take,
            };
        case 'REQUEST_ERROR':
            return {
                ...state,
                loading: false,
            };
        case 'FETCH_INIT':
            return {
                ...state,
                loading: true,
            };
        case 'UPDATE_QUERY':
            return {
                ...state,
                lastQuery: payload,
            };
        default:
            return state;
    }
}

export default function LazyTable() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [columns] = useState([
        { name: 'Id', title: 'Id', getCellValue: row => row[0] },
        { name: 'Vendor Name', title: 'Vendor Name', getCellValue: row => row[1] },
        { name: 'Vendor Number', title: 'Vendor#', getCellValue: row => row[2] },
        { name: 'Agreement Number', title: 'Agreement#', getCellValue: row => row[3] },
        { name: 'Contract Status', title: 'Status', getCellValue: row => row[4] },
        { name: 'Contract Category', title: 'Contract Category', getCellValue: row => row[5] },
        { name: 'Contract Effective Date', title: 'Effective Date', getCellValue: row => row[6] },
        { name: 'Contract Expiration Date', title: 'Expiration Date', getCellValue: row => row[7] },
    ]);
    const [tableColumnExtensions] = useState([
        { columnName: 'Id', width: 80 },
        { columnName: 'Vendor Name', width: 350 },
        { columnName: 'Vendor Number', width: 100 },
        { columnName: 'Agreement Number', width: 150 },
        { columnName: 'Contract Status', width: 100 },
        { columnName: 'Contract Category', width: 150 },
        { columnName: 'Contract Effective Date', width: 150 },
        { columnName: 'Contract Expiration Date', width: 150 },
    ]);

    const getRemoteRows = (requestedSkip, take) => {
        dispatch({ type: 'START_LOADING', payload: { requestedSkip, take } });
    };

    const loadData = () => {
        const {
            requestedSkip, take, lastQuery, loading,
        } = state;
        const query = buildQueryString(requestedSkip, take);
        if (query !== lastQuery && !loading) {
            dispatch({ type: 'FETCH_INIT' });
            fetch(query)
                .then(response => response.json())
                .then(({ data }) => {
                    dispatch({
                        type: 'UPDATE_ROWS',
                        payload: {
                            skip: requestedSkip,
                            rows: data,
                            totalCount: MAX_ROWS,
                        },
                    });
                })
                .catch(() => dispatch({ type: 'REQUEST_ERROR' }));
            dispatch({ type: 'UPDATE_QUERY', payload: query });
        }
    };

    useEffect(() => loadData());

    const {
        rows, skip, totalCount, loading,
    } = state;
    return (
        <Paper>
            <Grid
                rows={rows}
                columns={columns}
                getRowId={getRowId}
            >
                <VirtualTableState
                    loading={loading}
                    totalRowCount={totalCount}
                    pageSize={VIRTUAL_PAGE_SIZE}
                    skip={skip}
                    getRows={getRemoteRows}
                />
                <VirtualTable columnExtensions={tableColumnExtensions} />
                <TableHeaderRow />
            </Grid>
        </Paper>
    );
};
