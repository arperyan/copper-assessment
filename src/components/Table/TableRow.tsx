import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { convertDate } from "../../util";
import { UpdateOrder } from "../../api";
import Button from "../../ui/Button";

import { OrderItems } from "../../types";
import { selectedCount } from "../../redux/ordersSlice";

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

    let { getConvertMonthDay } = convertDate(rowData.createdAt);

    return (
        <tr>
            <td>
                <input
                    value={rowData.orderId}
                    type="checkbox"
                    name="Order Selector"
                    checked={isChecked}
                    aria-label="Order Selector"
                    onChange={getCheckBoxInput}
                />
                <label htmlFor="orderSelect" />
            </td>
            <td>{getConvertMonthDay}</td>
            <td>{rowData.orderType[0].toUpperCase()}</td>
            <td>{rowData.portfolioName}</td>
            <td>
                <div>{rowData.baseCurrency}</div>
                <div>{rowData.quoteCurrency}</div>
            </td>
            <td>{rowData.amount}</td>
            <td>
                <Button
                    label="Reject"
                    type="reject"
                    onPress={() => dispatch(UpdateOrder({ updateType: "reject", orderId: rowData.orderId }))}
                ></Button>
            </td>
            <td>
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
