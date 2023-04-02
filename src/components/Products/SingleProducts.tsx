import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";

import {useGetProductQuery} from "../../features/api/apiSlice";
import {ROUTES} from "../../utils/routes";
import {Product} from "./Product";
import {Products} from "./Products";
import {useAppDispatch, useAppSelector} from "../../hook";
import {getRelatedProducts} from "../../features/products/productsSlice";

export const SingleProduct = () => {
    const dispatch = useAppDispatch()
    const {related, list} = useAppSelector(({products}) => products)
    const {id} = useParams()
    const navigate = useNavigate()

    const {data, isLoading, isFetching, isSuccess} = useGetProductQuery(id)

    useEffect(() => {
        if (!isFetching && !isLoading && !isSuccess) {
            navigate(ROUTES.HOME)
        }
    }, [isLoading, isFetching, isSuccess]);

    useEffect(() => {
        if (!data || !list.length) return
        if (data) {
            dispatch(getRelatedProducts(data.category.id))
        }
    }, [dispatch, data, list.length]);

    return (
        !data ? (<section className="preloader">Loading</section>)
            : (
                <React.Fragment>
                    <Product {...data}/>
                    <Products
                        products={related}
                        title="Related products"
                        style={''}
                        amount={5}/>
                </React.Fragment>)
    );
};


