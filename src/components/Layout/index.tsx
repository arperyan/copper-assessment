import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GetOrders, UpdateBulkOrder } from '@/api';
import Table from '../Table';
import { Button, Spinner } from '@/ui';

import type { RootState } from '@/types';

import s from './layout.module.css';

const Layout: React.FC = () => {
    const dispatch = useDispatch();
    const theadData = ['Date', 'Buy/Sell', 'Account', 'Currency', 'Amount', 'Action'];

    useEffect(() => {
        dispatch(GetOrders());
    }, []);

    const { orders, loading, hasErrors, tickCount, orderAmount, orderSelected } = useSelector(
        (state: RootState) => state.orders
    );

    if (loading) return <Spinner></Spinner>;
    if (hasErrors) return <Spinner></Spinner>;

    return (
        <div className={s.container}>
            <h4 className={s.header_container}>Transactions</h4>
            <div className={s.infobar_container}>
                <div className={s.figures_container}>
                    <div className={s.figures_container_title}>
                        <div className={s.figures_container_title__order}>
                            {orderSelected.length > 0 ? 'Selected orders' : 'All orders'}
                        </div>
                        <div className={s.figures_container_title__value}>{tickCount}</div>
                    </div>
                    <div className={s.vertical_line}></div>
                    <div className={s.figures_container_title__longer}>
                        <div className={s.figures_container_title__amount}>
                            {orderSelected.length > 0 ? 'Total selected amount' : 'Total amount'}
                        </div>
                        <div className={s.figures_container_title__value}>{loading ? '0.00' : orderAmount} USD</div>
                    </div>
                </div>
                {orderSelected.length > 0 && (
                    <div className={s.button_container}>
                        <Button
                            label="Reject"
                            type="reject"
                            disabled={!orderSelected.length}
                            onPress={() => {
                                orderSelected.length
                                    ? dispatch(
                                          UpdateBulkOrder({
                                              updateType: 'bulk-reject',
                                              orderIds: orderSelected,
                                          })
                                      )
                                    : '';
                            }}>
                            Reject
                        </Button>
                        <Button
                            label="Approve"
                            type="accept"
                            disabled={!orderSelected.length}
                            onPress={() => {
                                orderSelected.length
                                    ? dispatch(
                                          UpdateBulkOrder({
                                              updateType: 'bulk-approve',
                                              orderIds: orderSelected,
                                          })
                                      )
                                    : '';
                            }}>
                            Accept
                        </Button>
                    </div>
                )}
            </div>

            <Table theadData={theadData} orders={orders}></Table>
        </div>
    );
};

export default Layout;
