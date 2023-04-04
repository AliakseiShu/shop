import {useEffect} from "react";

import {AppRoutes} from "../Routers/AppRoutes";
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";
import {getCategories} from "../../features/categories/categoriesSlice";
import {UserForm} from "../User/UserForm";
import {Sidebar} from "../Sidebar/Sidebar";

import {getProducts} from "../../features/products/productsSlice";
import {useAppDispatch} from "../../hook";

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getCategories())
        dispatch(getProducts())
    }, [dispatch]);

    return (
        <div className="app">
            <Header/>
            <UserForm/>
            <div className="container">
                <Sidebar/>
                <AppRoutes/>
            </div>
            <Footer/>
        </div>
    )
}

export default App
