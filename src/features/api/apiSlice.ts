import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

import {BASE_URL} from "../../utils/constants";
import {IProduct} from "../../components/Products/Products";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProduct: builder.query<IProduct[], string>({
            query: (id) => `/products/${id}`,
            providesTags: ["Product"]
        })
    })
})

export const { useGetProductQuery } = apiSlice





