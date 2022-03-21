import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { selectedCount } from "../../redux/ordersSlice";
import { convertDate } from "../../util";
import { UpdateOrder } from "../../api";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Icon from "../../ui/Icon";
import Tag from "../../ui/Tag";

import { OrderItems } from "../../types";

import styles from "./index.module.css";

type Props = {
    rowData: OrderItems;
    isAllChecked: boolean;
};

const TableRow: React.FC<Props> = ({ rowData, isAllChecked }) => {
    const [isChecked, isCheckedSet] = useState<boolean>(false);

    const dispatch = useDispatch();

    useEffect(() => {
        isCheckedSet(isAllChecked);
    }, [isAllChecked]);

    const getCheckBoxInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        isCheckedSet((prev) => !prev);

        dispatch(selectedCount({ checked: event.target.checked, value: event.target.value }));
    };

    let { getConvertMonth, getConvertDay, getConvertTime } = convertDate(rowData.createdAt);

    return (
        <tr className={isChecked && rowData.status !== "executed" ? styles.rowActive : ""}>
            <td>
                <Input
                    id={rowData.orderId.substring(0, 4)}
                    value={rowData.orderId}
                    type="checkbox"
                    name="Order Selector"
                    isChecked={rowData.status === "executed" ? false : isChecked}
                    isDisabled={rowData.status === "executed" ? true : false}
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
                <div className={styles.currency}>
                    <Icon name={rowData.baseCurrency}></Icon>
                    <div className={styles.grow}>
                        <div className={styles.currency_name}>{rowData.baseName}</div>
                        <div className={styles.currency_small}>{rowData.baseCurrency}</div>
                    </div>
                    <div className={styles.arrow}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 0 24 24"
                            width="24px"
                            fill="#000000"
                        >
                            <rect fill="none" height="24" width="24" />
                            <path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" />
                        </svg>
                    </div>
                    <Icon name={rowData.quoteCurrency}></Icon>
                    <div className={styles.grow}>
                        <div className={styles.currency_name}>{rowData.quoteName}</div>
                        <div className={styles.currency_small}>{rowData.quoteCurrency}</div>
                    </div>
                </div>
            </td>
            <td>
                <div className={styles.grow}>
                    <div className={styles.amount_name}>
                        <span>{rowData.amount}</span>
                        <span className={styles.currency_small__amount}>{rowData.baseCurrency}</span>
                    </div>
                    <div className={styles.currency_small}>
                        {rowData.quoteAmount}
                        <span className={styles.currency_small__amount}>{rowData.quoteCurrency}</span>
                    </div>
                </div>
            </td>
            {rowData.status !== "executed" && (
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
            )}
            {rowData.status === "executed" && (
                <td className={styles.buttongroup}>
                    <Tag />
                </td>
            )}
        </tr>
    );
};

export default TableRow;
