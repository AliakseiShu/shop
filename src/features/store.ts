import {configureStore} from '@reduxjs/toolkit'

import categoriesSlice from "./categories/categoriesSlice";
import productsSlice from "./products/productsSlice";
import {apiSlice} from "./api/apiSlice";
import {setupListeners} from "@reduxjs/toolkit/query";
import userSlice from "./user/userSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]:apiSlice.reducer,
        categories: categoriesSlice,
        products: productsSlice,
        user: userSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),

    devTools: true,
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

