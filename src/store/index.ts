import { configureStore } from "@reduxjs/toolkit";
import ordersSlice from "../redux/ordersSlice";

const store = configureStore({
    reducer: {
        orders: ordersSlice,
    },
});

export default store;
