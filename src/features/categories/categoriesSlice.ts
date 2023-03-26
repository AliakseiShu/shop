import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

import {BASE_URL} from "../../utils/constants";

export interface CategoryType {
    id: number,
    name: string,
    image: string
}

export interface CategoriesSliceType {
    list: CategoryType[]
    isLoading: boolean
}

const initialState: CategoriesSliceType = {
    list: [],
    isLoading: false
}

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async (_, thunkAPI) => {
        try {
            const res = await axios(`${BASE_URL}/categories`)
            return res.data
        } catch (err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err)
        }
    })

const categorieSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getCategories.fulfilled, (state, {payload}) => {
            state.list = payload
            state.isLoading = false
        })
        builder.addCase(getCategories.rejected, (state) => {
            state.isLoading = false
            console.log("ERROR")
        })
    }
})

export default categorieSlice.reducer