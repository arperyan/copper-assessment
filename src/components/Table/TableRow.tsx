import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { selectedCount } from "../../redux/ordersSlice";
import { convertDate } from "../../util";
import { UpdateOrder } from "../../api";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

import styles from "./index.module.css";

import { OrderItems } from "../../types";

type Props = {
    rowData: OrderItems;
};

const TableRow: React.FC<Props> = ({ rowData }) => {
    const [isChecked, isCheckedSet] = useState<boolean>(false);

    const dispatch = useDispatch();

    const getCheckBoxInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        isCheckedSet((prev) => !prev);

        dispatch(selectedCount({ checked: event.target.checked, value: event.target.value }));
    };

    let { getConvertMonth, getConvertDay, getConvertTime } = convertDate(rowData.createdAt);

    return (
        <tr>
            <td>
                <Input
                    id={rowData.orderId.substring(0, 3)}
                    value={rowData.orderId}
                    type="checkbox"
                    name="Order Selector"
                    isChecked={isChecked}
                    onInputChange={getCheckBoxInput}
                ></Input>
            </td>
            <td>
                <svg width="40" height="49">
                    <rect x="0" y="7" width="40" height="40" fill="#F8FAFA" rx="6" ry="6" />
                    <text x="50%" y="35%" dominantBaseline="middle" textAnchor="middle" fontSize="9">
                        {getConvertMonth}
                    </text>
                    <text x="50%" y="75%" dominantBaseline="middle" textAnchor="middle" fontSize="18">
                        {getConvertDay}
                    </text>
                </svg>
            </td>
            <td>
                <svg width="40" height="49">
                    <circle cx="50%" cy="40%" r="12" fill={rowData.orderType[0] === "b" ? "#D2FFD8" : "#FFECD2"} />
                    <text
                        x="50%"
                        y="45%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fontSize="16"
                        fill={rowData.orderType[0] === "b" ? "#28CF3E" : "#FFA428"}
                    >
                        {rowData.orderType[0].toUpperCase()}
                    </text>
                    <text x="50%" y="90%" dominantBaseline="middle" textAnchor="middle" fontSize="9">
                        {getConvertTime}
                    </text>
                </svg>
            </td>
            <td>{rowData.portfolioName}</td>
            <td>
                <div>{rowData.baseCurrency}</div>
                <div>{rowData.quoteCurrency}</div>
            </td>
            <td>{rowData.amount}</td>
            <td className={styles.buttongroup}>
                <Button
                    label="Reject"
                    type="reject"
                    onPress={() => dispatch(UpdateOrder({ updateType: "reject", orderId: rowData.orderId }))}
                ></Button>
                <Button
                    label="Approve"
                    type="accept"
                    onPress={() => dispatch(UpdateOrder({ updateType: "approve", orderId: rowData.orderId }))}
                ></Button>
            </td>
        </tr>
    );
};

export default TableRow;
