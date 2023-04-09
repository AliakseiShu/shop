import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

import {BASE_URL} from "../../utils/constants";
import {IProduct} from "../../components/Products/Products";
import {buildUrl} from "../../utils/common";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes: ['Product', 'Products'],
    endpoints: (builder) => ({
        getProduct: builder.query<IProduct, string>({
            query: (id) => `/products/${id}`,
            providesTags: ["Product"]
        }),
        getProducts: builder.query<IProduct[], any>({
            query: (params) => buildUrl('/products', params),
            providesTags: ["Products"]
        }),
    })
})

export const { useGetProductQuery, useGetProductsQuery } = apiSlice





