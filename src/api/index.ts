import { createAsyncThunk } from '@reduxjs/toolkit';

import type { GetCurrency, GetOrder, ThunkBulkType, ThunkType } from '@/types';

export const GetOrders = createAsyncThunk('orders/getOrders', async () => {
    const getCurrency: Promise<GetCurrency> = fetch(`${import.meta.env.VITE_BASE_URL}/api/currencies-info`).then(
        (res) => res.json()
    );
    const getOrders: Promise<GetOrder> = fetch(`${import.meta.env.VITE_BASE_URL}/api/orders`).then((res) => res.json());

    return await Promise.all([getCurrency, getOrders]);
});

export const UpdateOrder = createAsyncThunk(
    'orders/updateOrder',
    async ({ updateType, orderId }: ThunkType): Promise<GetOrder> => {
        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Content-Type', `application/vnd.${updateType.toLowerCase()}-order+json`);

        return await (
            await fetch(`${import.meta.env.VITE_BASE_URL}/api/orders/${orderId}`, {
                method: 'PATCH',
                headers: requestHeaders,
            })
        ).json();
    }
);

export const UpdateBulkOrder = createAsyncThunk(
    'orders/updateBulkOrder',
    async ({ updateType, orderIds }: ThunkBulkType): Promise<GetOrder> => {
        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Content-Type', `application/vnd.${updateType.toLowerCase()}-order+json`);

        return await (
            await fetch(`${import.meta.env.VITE_BASE_URL}/api/orders`, {
                method: 'PATCH',
                headers: requestHeaders,
                body: JSON.stringify({ orderIds: orderIds }),
            })
        ).json();
    }
);
