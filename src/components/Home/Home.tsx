import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../hook";
import {filterByPrice} from "../../features/products/productsSlice";

import {Poster} from "../Poster/Poster";
import {Products} from "../Products/Products";
import {Categories} from "../Categories/Categories";
import {Banner} from "../Banner/Banner";

export const Home = () => {
    const {products:{list, filtered}, categories} = useAppSelector((state) => state)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(!list.length) return
       dispatch(filterByPrice(100))
    }, [dispatch, list.length]);

    return (
        <React.Fragment>
            <Poster/>
            <Products
                products={list}
                title="Trending"
                style={''}
                amount={5}/>
            <Categories
                products={categories.list}
                title="Worth seeing"
                style={''}
                amount={5}/>
            <Banner/>
            <Products
                products={filtered}
                title="Less than 100$"
                style={''}
                amount={5}/>
        </React.Fragment>
    );
};
