import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import styles from '../../styles/Category.module.css';

import {useGetProductsQuery} from "../../features/api/apiSlice";

type DefaultParamsType = {
    title: string,
    price_min: number,
    price_max: number,
    categoryId?: string,
}

export const Category = () => {
    const {id} = useParams()

    const defaultParams = {
        title: '',
        price_min: 0,
        price_max: 0,
        categoryId: id,
    }

    const [params, setParams] = useState<DefaultParamsType>(defaultParams)

    useEffect(() => {
        if (!id) return
        setParams({...defaultParams, categoryId: id})
    }, [id]);

    const {data} = useGetProductsQuery(params)

    return (
        <section className={styles.wrapper}>
            <h2 className={styles.title}>Shoes</h2>
            <form className={styles.filters} onSubmit={() => {
            }}>
                <div className={styles.filter}>
                    <input type="text" name="title" onChange={() => {
                    }} placeholder="Product name"/>
                </div>
            </form>
        </section>
    );
};


