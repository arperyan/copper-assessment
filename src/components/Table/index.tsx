import React from "react";
import { useSelector } from "react-redux";

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
    const { orderSelected, loading, hasErrors } = useSelector((state: RootState) => state.orders);

    return (
        <table className={styles.table_container}>
            <thead>
                <tr>
                    <th>
                        <Input
                            id="0"
                            //value={}
                            type="checkbox"
                            isActive={orderSelected.length > 0 ? true : false}
                            name="All selected"
                            //isChecked={isChecked}
                            //onInputChange={getCheckBoxInput}
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
                    return <TableRow key={rowData.orderId} rowData={rowData}></TableRow>;
                })}
            </tbody>
        </table>
    );
};

export default Table;
