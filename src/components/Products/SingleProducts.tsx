import React from 'react';
import {useGetProductQuery} from "../../features/api/apiSlice";

export const SingleProduct = () => {
  const {data} = useGetProductQuery('5')
    console.log(data)
    return (
        <div>
            SingleProducts
        </div>
    );
};


