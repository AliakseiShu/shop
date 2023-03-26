import {useDispatch} from "react-redux";
import {useEffect} from "react";

import {AppRoutes} from "../Routers/AppRoutes";
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";
import {Sidebar} from "../Sidebar/Sidebar";
import {getCategories} from "../../features/categories/categoriesSlice";
import {useAppDispatch} from "../../features/store";
import {getProducts} from "../../features/products/productsSlice";

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getCategories())
        dispatch(getProducts())
    }, [dispatch]);

    return (
        <div className="app">
            <Header/>
            <div className="container">
                <Sidebar/>
                <AppRoutes/>
            </div>
            <Footer/>
        </div>
    )
}

export default App
