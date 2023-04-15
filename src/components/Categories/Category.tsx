import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import styles from '../../styles/Category.module.css';

import {useGetProductsQuery} from "../../features/api/apiSlice";
import {IProduct, Products} from "../Products/Products";
import {useAppSelector} from "../../hook";

type DefaultParamsType = {
    categoryId?: string,
    limit: number,
    offset: number,
}
type DefaultValuesType = {
    title: string,
    price_min: number,
    price_max: number,
}

export const Category = () => {
    const {id} = useParams()
    const {list} = useAppSelector(({categories}) => categories)

    let newId = (id?.replace(/[^0-9]/g, ""))

    const defaultValues = {
        title: '',
        price_min: 0,
        price_max: 0,
    }

    const defaultParams = {
        categoryId: newId,
        limit: 5,
        offset: 0,
        ...defaultValues,
    }

    const [isEnd, setIsEnd] = useState(false)
    const [cat, setCat] = useState("")
    const [items, setItems] = useState<IProduct[]>([])
    const [values, setValues] = useState<DefaultValuesType>(defaultValues)
    const [params, setParams] = useState<DefaultParamsType>(defaultParams)

    const {data = [], isLoading, isSuccess} = useGetProductsQuery(params)

    useEffect(() => {
        if (!newId) return
        setValues(defaultValues)
        setItems([])
        setIsEnd(false)
        setParams({...defaultParams, categoryId: newId})
    }, [newId]);

    useEffect(() => {
        if (!id || !list.length) return
        const category = list.find((item) => item.id === Number(newId))
        category && setCat(category.name)
    }, [list, id]);

    useEffect(() => {
        if (isLoading) return
        if (!data.length) return setIsEnd(true)
        setItems((_items: any) => [..._items, ...data])
    }, [data, isLoading]);

    const handleChange = (e: ChangeEvent<HTMLInputElement> | any) => {
        const {target: {name, value}} = e
        setValues({...values, [name]: value})
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setItems([])
        setIsEnd(false)
        setParams({...defaultParams, ...values})
    }
    return (
        <section className={styles.wrapper}>
            <h2 className={styles.title}>{cat}</h2>
            <form className={styles.filters} onSubmit={handleSubmit}>
                <div className={styles.filter}>
                    <input type="text"
                           name="title"
                           onChange={handleChange}
                           placeholder="Product name"
                           value={values.title}/>
                </div>
                <div className={styles.filter}>
                    <input type="number"
                           name="price_min"
                           onChange={handleChange}
                           placeholder="0"
                           value={values.price_min}/>
                    <span>Price from</span>
                </div>
                <div className={styles.filter}>
                    <input type="number"
                           name="price_max"
                           onChange={handleChange}
                           placeholder="0"
                           value={values.price_max}/>
                    <span>Price to</span>
                </div>
                <button type="submit" hidden/>
            </form>
            {isLoading ? (
                <div className="preloader">Loading...</div>
            ) : !isSuccess || !items?.length ? (
                <div className={styles.back}>
                    <span>No results</span>
                    <button>Reset</button>
                </div>
            ) : <Products title=""
                          products={items}
                          style={{padding: 0}}
                          amount={items.length}/>}
            {!isEnd &&  <div className={styles.more}>
                <button onClick={() => setParams({...params, offset: params.offset + params.limit})}>
                    See more
                </button>
            </div> }
        </section>
    );
};


