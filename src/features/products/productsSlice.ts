import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

import {BASE_URL} from "../../utils/constants";
import {IProduct} from "../../components/Products/Products";
import {shuffle} from "../../utils/common";

export interface ProductsSlice {
    list: IProduct[]
    filtered: IProduct[]
    related: any
    isLoading: boolean
}

const initialState: ProductsSlice = {
    list: [],
    filtered: [],
    related: [],
    isLoading: false
}

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (_, thunkAPI) => {
        try {
            const res = await axios(`${BASE_URL}/products`)
            return res.data
        } catch (err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err)
        }
    })

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        filterByPrice: (state, {payload}) => {
            state.filtered = state.list.filter(({price}) => price < payload)
        },
        getRelatedProducts: (state, {payload}) => {
            const list = state.list.filter(({category: {id}}) => id === payload)
            state.related = shuffle(list)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getProducts.fulfilled, (state, {payload}) => {
            state.list = payload
            state.isLoading = false
        })
        builder.addCase(getProducts.rejected, (state) => {
            state.isLoading = false
            console.log("ERROR")
        })
    }
})

export const {filterByPrice, getRelatedProducts} = productsSlice.actions

export default productsSlice.reducer