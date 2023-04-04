import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IProduct} from "../../components/Products/Products";
import axios from "axios";
import {BASE_URL} from "../../utils/constants";

export interface IUser {
    id: number,
    email: string,
    password: string,
    name: string,
    role: string,
    avatar: string,
}

export interface ICategoriesSlice {
    currentUser: IUser[]
    cart: IProduct[]
    isLoading: boolean
    formType: string
    showForm: boolean
}

const initialState: ICategoriesSlice = {
    currentUser: {} as IUser[],
    cart: [],
    isLoading: false,
    formType: "signup",
    showForm: false
}

export const createUser = createAsyncThunk<IUser[]>(
    'users/createUser',
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/users`, payload)
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
        }
    },
    extraReducers: (builder) => {
        /*  builder.addCase(getCategories.pending, (state) => {
              state.isLoading = true
          })*/
        builder.addCase(createUser.fulfilled, (state, {payload}) => {
            state.currentUser = payload
        })
        /*   builder.addCase(getCategories.rejected, (state) => {
               state.isLoading = false
               console.log("ERROR")
           })*/
    },
})
export const {addItemToCart, toggleForm} = userSlice.actions

export default userSlice.reducer