import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GetOrders, UpdateBulkOrder, UpdateOrder } from '@/api';

import type { OrderItems, SelectedCount, SelectedGroupCount } from '@/types';
import { convertNumberFormat } from '@/util/helper';
import { GetCurrency, GetOrder } from '@/types';

export const selectedCount = createAction<SelectedCount>('selectedCount');
export const selectedGroupCount = createAction<SelectedGroupCount>('selectedGroupCount');

let currencyApi: GetCurrency[] = [];

const convertToUSD = (baseCurrency: string, amount: number) => {
    const currencyObj = currencyApi.find((rateValue) => rateValue._embedded.price.baseCurrency === baseCurrency);

    return currencyObj._embedded.price.price * amount;
};

const getCurrencyName = (baseCurrency: string) => {
    const currencyObj = currencyApi.find((rateValue) => rateValue._embedded.price.baseCurrency === baseCurrency);

    return currencyObj.name;
};

const orderArray = (orders: OrderItems[]) => {
    return orders.reduce((acc, value): string[] => {
        return value.status !== 'executed' ? [...acc, value.orderId] : acc;
    }, []);
};

const initialState = {
    orders: [] as OrderItems[],
    loading: false,
    hasErrors: false,
    tickCount: 0,
    orderSelected: [] as string[],
    orderAmount: '',
    allOrderSelected: [] as string[],
};

let convertToCurrency: string;

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Get Order from API - success
            .addCase(GetOrders.fulfilled, (state, action: PayloadAction<GetOrder>) => {
                const [currency, orders] = action.payload;
                currencyApi = currency;

                const ordersWithRates: OrderItems[] = orders.map((obj: OrderItems) => {
                    return {
                        ...obj,
                        USDAmount: convertToUSD(obj.baseCurrency, obj.amount),
                        baseName: getCurrencyName(obj.baseCurrency),
                        quoteName: getCurrencyName(obj.quoteCurrency),
                    };
                });

                const orderAmountSum: number = orders.reduce((acc: number, value: OrderItems) => {
                    return acc + convertToUSD(value.baseCurrency, value.amount);
                }, 0);

                const orderWithRatesSort = ordersWithRates.sort(
                    (firstCompare: OrderItems, secondCompare: OrderItems) =>
                        parseFloat(firstCompare.createdAt) - parseFloat(secondCompare.createdAt)
                );

                convertToCurrency = convertNumberFormat(orderAmountSum);

                state.allOrderSelected = orderArray(orders);
                state.loading = false;
                state.hasErrors = false;
                state.tickCount = ordersWithRates.length;
                state.orders = orderWithRatesSort;
                state.orderAmount = convertToCurrency;
            })
            //Get Order from API - pending
            .addCase(GetOrders.pending, (state) => {
                state.loading = true;
                state.hasErrors = false;
                state.orders = [];
            })
            //Get Order from API - rejected
            .addCase(GetOrders.rejected, (state) => {
                state.loading = false;
                state.hasErrors = true;
                state.orders = [];
            })
            //Update Order from API - pending
            .addCase(UpdateOrder.fulfilled, (state, action: PayloadAction<GetOrder>) => {
                const orderIndex = state.orders.findIndex(
                    (stateOrder) => stateOrder.orderId === action.payload.orderId
                );
                state.orders[orderIndex] = {
                    ...action.payload,
                    USDAmount: convertToUSD(state.orders[orderIndex].baseCurrency, state.orders[orderIndex].amount),
                };

                state.allOrderSelected = orderArray(state.orders);
            })
            //Update Bulk orders from API - success
            .addCase(UpdateBulkOrder.fulfilled, (state, action: PayloadAction<GetOrder>) => {
                state.orders = action.payload.map((obj: OrderItems) => ({
                    ...obj,
                    USDAmount: convertToUSD(obj.baseCurrency, obj.amount),
                    baseName: getCurrencyName(obj.baseCurrency),
                    quoteName: getCurrencyName(obj.quoteCurrency),
                }));

                state.allOrderSelected = orderArray(state.orders);

                state.orderAmount = convertToCurrency;
                state.orderSelected = [];
                state.tickCount = state.orders.length;
            })
            //Get Selected count for the headers - the amount and number of orders selected
            .addCase(selectedCount, (state, action: PayloadAction<GetOrder>) => {
                const { checked, value } = action.payload;

                state.orderSelected = checked
                    ? [...state.orderSelected, value]
                    : state.orderSelected.filter((filterValue) => filterValue !== value);

                const orderAmountSelectedSum: any = state.orders.reduce((acc: any, value: OrderItems) => {
                    return state.orderSelected.includes(value.orderId)
                        ? acc + convertToUSD(value.baseCurrency, value.amount)
                        : acc;
                }, 0);

                state.tickCount = state.orderSelected.length > 0 ? state.orderSelected.length : state.orders.length;
                state.orderAmount =
                    state.orderSelected.length > 0 ? convertNumberFormat(orderAmountSelectedSum) : convertToCurrency;
            })
            //Get Selected count for all the headers - the amount and number of orders selected
            .addCase(selectedGroupCount, (state, action: PayloadAction<GetOrder>) => {
                const { value } = action.payload;

                state.orderSelected = value;

                const orderAmountSelectedSum: any = state.orders.reduce((acc: any, value: OrderItems) => {
                    return value.status !== 'executed' ? acc + convertToUSD(value.baseCurrency, value.amount) : acc;
                }, 0);

                state.tickCount = state.orderSelected.length > 0 ? state.orderSelected.length : state.orders.length;
                state.orderAmount =
                    state.orderSelected.length > 0 ? convertNumberFormat(orderAmountSelectedSum) : convertToCurrency;
            });
    },
});

export default ordersSlice.reducer;
