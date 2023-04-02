import {createSlice} from "@reduxjs/toolkit";
import {IProduct} from "../../components/Products/Products";

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
}

const initialState: ICategoriesSlice = {
    currentUser: [],
    cart: [],
    isLoading: false,
}

/*export const getCategories = createAsyncThunk<IUser[]>(
    'categories/getCategories',
    async (_, thunkAPI) => {
        try {
            const res = await axios(`${BASE_URL}/categories`)
            return res.data
        } catch (err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err)
        }
    })*/

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
                        ? {...item, quantity: payload.quantity || item.quantity + 1 }
                        : item
                })
            } else newCart.push({...payload, quantity: 1})
            state.cart = newCart
        }
    },
    extraReducers: (builder) => {
        /*builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getCategories.fulfilled, (state, {payload}) => {
            state.list = payload
            state.isLoading = false
        })
        builder.addCase(getCategories.rejected, (state) => {
            state.isLoading = false
            console.log("ERROR")
        })*/
    },
})
export const { addItemToCart } = userSlice.actions

export default userSlice.reducer