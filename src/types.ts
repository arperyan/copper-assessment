import store from "./store";

import type { ThunkAction, Action } from "@reduxjs/toolkit";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export type OrderItems = {
    amount: number;
    baseCurrency: string;
    createdAt: string;
    orderId: string;
    orderStatus: string;
    orderType: string;
    portfolioName: string;
    quoteAmount: number;
    quoteCurrency: string;
    USDAmount?: number;
    status?: string;
};

export type ThunkType = {
    updateType: string;
    orderId: string;
};

export type ThunkBulkType = {
    updateType: string;
    orderIds: string[];
};

export type OrderStates = {
    orders: OrderItems[];
    loading: boolean;
    hasErrors: boolean;
    tickCount: number;
    orderSelected: string[];
    orderAmount: number | string;
    allOrderSelected: string[];
};

export type SelectedCount = {
    checked: boolean;
    value: string;
};

export type SelectedGroupCount = {
    value: string[];
};
