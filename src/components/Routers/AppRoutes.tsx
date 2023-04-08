import React from 'react';
import {Route, Routes} from "react-router-dom";

import {SingleProduct} from "../Products/SingleProducts";
import {Home} from "../Home/Home";
import {Profile} from "../Profile/Profile";

import {ROUTES} from "../../utils/routes";

export const AppRoutes = () => (
        <Routes>
            <Route index element={<Home />}/>
            <Route path={ROUTES.PRODUCTS} element={<SingleProduct/>}/>
            <Route path={ROUTES.PROFILE} element={<Profile/>}/>
        </Routes>
    );


