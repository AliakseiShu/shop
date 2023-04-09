import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IProduct} from "../../components/Products/Products";
import axios from "axios";
import {BASE_URL} from "../../utils/constants";
import {ValuesType} from "../../components/User/UserSignupForm";
import {ValuesLoginType} from "../../components/User/UserLoginForm";

export interface IUser {
    id: number,
    email: string,
    password: string,
    name: string,
    role: string,
    avatar: string,
}

export interface ICategoriesSlice {
    currentUser: null | ValuesType
    cart: IProduct[]
    isLoading: boolean
    formType: string
    showForm: boolean
}

const initialState: ICategoriesSlice = {
    currentUser: null,
    cart: [],
    isLoading: false,
    formType: "signup",
    showForm: false
}

export const createUser = createAsyncThunk(
    'users/createUser',
    async (payload: ValuesType, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/users`, payload)
            console.log('2')
            return res.data
        } catch (err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err)
        }
    })

export const authUser = createAsyncThunk(
    'users/auth',
    async (payload: ValuesLoginType, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, payload)
            const login = await axios.get(`${BASE_URL}/auth/profile`, {
                headers: {
                    "Authorization": `Bearer ${res.data.access_token}`
                }
            })
            return login.data
        } catch (err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err)
        }
    })

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (payload: ValuesType, thunkAPI) => {
        try {
            const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload)
            return res.data
        } catch (err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err)
        }
    })

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addItemToCart: (state, {payload}) => {
            let newCart = [...state.cart]
            const found = state.cart.find(({id}) => id === payload.id)
            if (found) {
                newCart = newCart.map((item) => {
                    return item.id === payload.id
                        ? {...item, quantity: payload.quantity || item.quantity + 1}
                        : item
                })
            } else newCart.push({...payload, quantity: 1})
            state.cart = newCart
        },
        toggleForm: (state, {payload}) => {
            state.showForm = payload
        },
        toggleFormType: (state, {payload}) => {
            state.formType = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state, {payload}) => {
            state.currentUser = payload
        })
        builder.addCase(authUser.fulfilled, (state, {payload}) => {
            state.currentUser = payload
        })
        builder.addCase(updateUser.fulfilled, (state, {payload}) => {
            state.currentUser = payload
        })
    },
})
export const {addItemToCart, toggleForm, toggleFormType} = userSlice.actions

export default userSlice.reducer