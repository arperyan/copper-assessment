import React, { useState } from "react";

import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

import type { OrderItems } from "../../types";

import styles from "./index.module.css";

type Props = {
    theadData: string[];
    orders: OrderItems[];
};

const Table: React.FC<Props> = ({ theadData, orders }) => {
    return (
        <table className={styles.table_container}>
            <thead>
                <tr>
                    <td></td>
                    {theadData.map((headerItem, i) => {
                        return <TableHeader key={`header-${i}`} headerItem={headerItem} />;
                    })}
                </tr>
            </thead>
            <tbody>
                {orders.map((rowData, i) => {
                    return <TableRow key={rowData.orderId} rowData={rowData}></TableRow>;
                })}
            </tbody>
        </table>
    );
};

export default Table;
