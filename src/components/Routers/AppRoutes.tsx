import React from 'react';
import {Route, Routes} from "react-router-dom";

import {ROUTES} from "../../utils/routes";

import {SingleProduct} from "../Products/SingleProducts";
import {Home} from "../Home/Home";
import {Profile} from "../Profile/Profile";
import {SingleCategory} from "../Categories/SingleCategory";
import {Cart} from "../Cart/Cart";

export const AppRoutes = () => (
        <Routes>
            <Route index element={<Home />}/>
            <Route path={ROUTES.PRODUCTS} element={<SingleProduct/>}/>
            <Route path={ROUTES.PROFILE} element={<Profile/>}/>
            <Route path={ROUTES.CATEGORY} element={<SingleCategory/>}/>
            <Route path={ROUTES.CART} element={<Cart/>}/>
        </Routes>
    );


