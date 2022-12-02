import store from '../store';

import type { ThunkAction, Action } from '@reduxjs/toolkit';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export type GetCurrency = {
    currency: string;
    mainCurrency: string;
    name: string;
    fiat: boolean;
    priority: string;
    confirmations: string;
    decimal: string;
    tags: string[];
    extra: Extra;
    explorerUrl: string;
    _embedded: Embedded;
};

export type Extra = {};

export type Embedded = {
    price: Price;
};

export type Price = {
    baseCurrency: string;
    quoteCurrency: string;
    price: string;
};

export type GetOrder = {
    amount: string;
    baseCurrency: string;
    createdAt: string;
    orderId: string;
    orderStatus: string;
    orderType: string;
    portfolioName: string;
    quoteAmount: string;
    quoteCurrency: string;
};

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
    baseName: string;
    quoteName: string;
};

export type ThunkType = {
    updateType: string;
    orderId: string;
};

export type ThunkBulkType = {
    updateType: string;
    orderIds: string[];
};

export type SelectedCount = {
    checked: boolean;
    value: string;
};

export type SelectedGroupCount = {
    value: string[];
};
