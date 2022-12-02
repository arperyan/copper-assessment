import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { selectedCount } from '@/redux/ordersSlice';
import { convertDate } from '@/util/helper';
import { UpdateOrder } from '@/api';
import { Button, Input, Icon, Tag } from '@/ui';

import { OrderItems } from '@/types';

import s from './table.module.css';

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
        <tr className={isChecked && rowData.status !== 'executed' ? s.rowActive : ''}>
            <td>
                <Input
                    id={rowData.orderId.substring(0, 4)}
                    value={rowData.orderId}
                    type="checkbox"
                    name="Order Selector"
                    isChecked={rowData.status === 'executed' ? false : isChecked}
                    isDisabled={rowData.status === 'executed' ? true : false}
                    onInputChange={getCheckBoxInput}></Input>
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
                    <circle cx="50%" cy="40%" r="12" fill={rowData.orderType[0] === 'b' ? '#D2FFD8' : '#FFECD2'} />
                    <text
                        x="50%"
                        y="45%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fontSize="16"
                        fill={rowData.orderType[0] === 'b' ? '#28CF3E' : '#FFA428'}>
                        {rowData.orderType[0].toUpperCase()}
                    </text>
                    <text x="50%" y="90%" dominantBaseline="middle" textAnchor="middle" fontSize="9">
                        {getConvertTime}
                    </text>
                </svg>
            </td>
            <td>
                <div className={s.portfolioName}>{rowData.portfolioName}</div>
            </td>
            <td>
                <div className={s.currency}>
                    <Icon name={rowData.baseCurrency}></Icon>
                    <div className={s.grow}>
                        <div className={s.currency_name}>{rowData.baseName}</div>
                        <div className={s.currency_small}>{rowData.baseCurrency}</div>
                    </div>
                    <div className={s.arrow}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 0 24 24"
                            width="24px"
                            fill="#000000">
                            <rect fill="none" height="24" width="24" />
                            <path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" />
                        </svg>
                    </div>
                    <Icon name={rowData.quoteCurrency}></Icon>
                    <div className={s.grow}>
                        <div className={s.currency_name}>{rowData.quoteName}</div>
                        <div className={s.currency_small}>{rowData.quoteCurrency}</div>
                    </div>
                </div>
            </td>
            <td>
                <div className={s.grow}>
                    <div className={s.amount_name}>
                        <span>{rowData.amount}</span>
                        <span className={s.currency_small__amount}>{rowData.baseCurrency}</span>
                    </div>
                    <div className={s.currency_small}>
                        {rowData.quoteAmount}
                        <span className={s.currency_small__amount}>{rowData.quoteCurrency}</span>
                    </div>
                </div>
            </td>
            {rowData.status !== 'executed' && (
                <td className={s.buttongroup}>
                    <Button
                        label="Reject"
                        type="reject"
                        onPress={() =>
                            dispatch(UpdateOrder({ updateType: 'reject', orderId: rowData.orderId }))
                        }></Button>
                    <Button
                        label="Approve"
                        type="accept"
                        onPress={() =>
                            dispatch(UpdateOrder({ updateType: 'approve', orderId: rowData.orderId }))
                        }></Button>
                </td>
            )}
            {rowData.status === 'executed' && (
                <td className={s.buttongroup}>
                    <Tag />
                </td>
            )}
        </tr>
    );
};

export default TableRow;
