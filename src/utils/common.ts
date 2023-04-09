import {IProduct} from "../components/Products/Products";

export const shuffle = (arr: IProduct[]) => [...arr].sort(() => 0.5 - Math.random())

export const buildUrl = (url: string, params: string) => {
    let urlWithParams = url
    Object.entries(params).forEach(([key, value], i) => {
        const sign = !i ? '?' : '&'
        urlWithParams +=`${sign}${key}=${value}`
    })
    return urlWithParams
}