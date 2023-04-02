import {IProduct} from "../components/Products/Products";

export const shuffle = (arr:IProduct[]) => [...arr].sort(() => 0.5 - Math.random())