import {configureStore} from '@reduxjs/toolkit'

import categoriesSlice from "./categories/categoriesSlice";
import productsSlice from "./products/productsSlice";
import {apiSlice} from "./api/apiSlice";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]:apiSlice.reducer,
        categories: categoriesSlice,
        products: productsSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),

    devTools: true,
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

