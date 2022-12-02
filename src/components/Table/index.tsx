import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectedGroupCount } from '@/redux/ordersSlice';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import { Input } from '@/ui';
import Messages from '../Messages';

import type { OrderItems, RootState } from '@/types';

import styles from './table.module.css';

type Props = {
    theadData: string[];
    orders: OrderItems[];
};

const Table: React.FC<Props> = ({ theadData, orders }) => {
    const [isAllChecked, isAllCheckedSet] = useState<boolean>(false);

    const dispatch = useDispatch();

    const { orderSelected, loading, hasErrors, allOrderSelected } = useSelector((state: RootState) => state.orders);

    const getCheckBoxAllInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        isAllCheckedSet((prev) => !prev);

        dispatch(selectedGroupCount({ value: event.target.checked ? allOrderSelected : [] }));
    };
    return (
        <table className={styles.table_container}>
            <thead>
                <tr>
                    <th>
                        <Input
                            id="0"
                            value={allOrderSelected}
                            type="checkbox"
                            name="All selected"
                            isActive={orderSelected.length > 0 ? true : false}
                            isChecked={isAllChecked}
                            onInputChange={getCheckBoxAllInput}></Input>
                    </th>
                    {theadData.map((headerItem, i) => {
                        return <TableHeader key={`header-${i}`} headerItem={headerItem} />;
                    })}
                </tr>
            </thead>
            {!loading && orders.length === 0 && <Messages message="No Transactions" />}
            {loading && <Messages message="Loading..." />}
            {hasErrors && <Messages message="Error while loading..." />}
            <tbody>
                {orders.map((rowData, i) => {
                    return <TableRow key={rowData.orderId} rowData={rowData} isAllChecked={isAllChecked}></TableRow>;
                })}
            </tbody>
        </table>
    );
};

export default Table;
