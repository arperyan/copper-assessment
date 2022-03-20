import { createAction, createSlice } from "@reduxjs/toolkit";

import { GetOrders, UpdateBulkOrder, UpdateOrder } from "../api";

import type { OrderItems, OrderStates, SelectedCount, SelectedGroupCount } from "../types";
import { convertNumberFormat } from "../util";

export const selectedCount = createAction<SelectedCount>("selectedCount");
export const selectedGroupCount = createAction<SelectedGroupCount>("selectedGroupCount");

let currencyApi: any[] = [];

const convertToUSD = (baseCurrency: string, amount: number) => {
    const currencyObj = currencyApi.find((rateValue: any) => rateValue._embedded.price.baseCurrency === baseCurrency);

    return currencyObj._embedded.price.price * amount;
};

const orderArray = (orders: OrderItems[]) => {
    return orders.reduce((acc: any, value: any): string[] => {
        return value.status !== "executed" ? [...acc, value.orderId] : acc;
    }, []);
};

const initialState: OrderStates = {
    orders: [],
    loading: false,
    hasErrors: false,
    tickCount: 0,
    orderSelected: [],
    orderAmount: "",
    allOrderSelected: [],
};

let convertToCurrency: string;

export const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder //Get Order from API - success
            .addCase(GetOrders.fulfilled, (state, action) => {
                const [currency, orders] = action.payload;
                currencyApi = currency;

                const ordersWithRates: OrderItems[] = orders.map((obj: OrderItems) => {
                    return {
                        ...obj,
                        USDAmount: convertToUSD(obj.baseCurrency, obj.amount),
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
            }) //Get Order from API - pending
            .addCase(GetOrders.pending, (state) => {
                state.loading = true;
                state.hasErrors = false;
                state.orders = [];
            }) //Get Order from API - rejected
            .addCase(GetOrders.rejected, (state) => {
                state.loading = false;
                state.hasErrors = true;
                state.orders = [];
            }) //Update Order from API - pending
            .addCase(UpdateOrder.fulfilled, (state, action) => {
                const orderIndex = state.orders.findIndex(
                    (stateOrder) => stateOrder.orderId === action.payload.orderId
                );
                state.orders[orderIndex] = {
                    ...action.payload,
                    USDAmount: convertToUSD(state.orders[orderIndex].baseCurrency, state.orders[orderIndex].amount),
                };

                state.allOrderSelected = orderArray(state.orders);
            }) //Update Bulk orders from API - success
            .addCase(UpdateBulkOrder.fulfilled, (state, action) => {
                state.orders = action.payload.map((obj: OrderItems) => ({
                    ...obj,
                    USDAmount: convertToUSD(obj.baseCurrency, obj.amount),
                }));

                state.allOrderSelected = orderArray(state.orders);

                state.orderAmount = convertToCurrency;
                state.orderSelected = [];
                state.tickCount = state.orders.length;
            }) //Get Selected count for the headers - the amount and number of orders selected
            .addCase(selectedCount, (state, action) => {
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

            .addCase(selectedGroupCount, (state, action) => {
                const { value } = action.payload;
                console.log(value);
                state.orderSelected = value;

                const orderAmountSelectedSum: any = state.orders.reduce((acc: any, value: OrderItems) => {
                    return acc + convertToUSD(value.baseCurrency, value.amount);
                }, 0);

                console.log(state.orderSelected.length, convertToCurrency);
                state.tickCount = state.orderSelected.length > 0 ? state.orderSelected.length : state.orders.length;
                state.orderAmount =
                    state.orderSelected.length > 0 ? convertNumberFormat(orderAmountSelectedSum) : convertToCurrency;
            });
    },
});

export default ordersSlice.reducer;
