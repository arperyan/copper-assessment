import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectedGroupCount } from "../../redux/ordersSlice";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import Input from "../../ui/Input";
import Messages from "../Messages";

import type { OrderItems, RootState } from "../../types";

import styles from "./index.module.css";

type Props = {
    theadData: string[];
    orders: OrderItems[];
};

const Table: React.FC<Props> = ({ theadData, orders }) => {
    const [isAllChecked, isAllCheckedSet] = useState<boolean>(false);
    const [allOrders, allOrdersSet] = useState<string[]>([]);

    const dispatch = useDispatch();

    const { loading, hasErrors, allOrderSelected } = useSelector((state: RootState) => state.orders);

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
                            value={allOrders}
                            type="checkbox"
                            name="All selected"
                            isChecked={isAllChecked}
                            onInputChange={getCheckBoxAllInput}
                        ></Input>
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
