import React, {ChangeEvent, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

import {BsSearch} from "@react-icons/all-files/bs/BsSearch";
import {AiTwotoneHeart} from "@react-icons/all-files/ai/AiTwotoneHeart";
import {BiCart} from "@react-icons/all-files/bi/BiCart";

import {useAppDispatch, useAppSelector} from "../../hook";
import {toggleForm} from "../../features/user/userSlice";
import {ROUTES} from "../../utils/routes";

import styles from '../../styles/Header.module.css';

import LOGO from "../../images/logo.svg"
import AVATAR from "../../images/avatar.jpg"
import {ValuesType} from "../User/UserSignupForm";
import {useGetProductsQuery} from "../../features/api/apiSlice";

export const Header = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {currentUser, cart} = useAppSelector(({user}) => user)

    const [searchValue, setSearchValue] = useState('');
    const [values, setValues] = useState<ValuesType>({
        id: '',
        name: 'Guest',
        email: '',
        password: '',
        avatar: AVATAR
    });

    const {data, isLoading} = useGetProductsQuery({title: searchValue})

    useEffect(() => {
        if (!currentUser) return
        setValues(currentUser)
    }, [currentUser]);

    const handleClick = () => {
        if (!currentUser) dispatch(toggleForm(true))
        else navigate(ROUTES.PROFILE)
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link to={ROUTES.HOME}>
                    <img src={LOGO} alt="LOGO"/>
                </Link>
            </div>
            <div className={styles.info}>
                <div className={styles.user} onClick={handleClick}>
                    <div className={styles.avatar} style={{backgroundImage: `url(${values.avatar})`}}/>
                    <div className={styles.username}>{values.name}</div>
                </div>

                <form className={styles.form}>
                    <div className={styles.icon}>
                        <BsSearch/>
                    </div>
                    <div className={styles.input}>
                        <input type="search"
                               name="search"
                               placeholder="Search..."
                               autoComplete="off"
                               onChange={handleSearch}
                               value={searchValue}/>
                    </div>
                    {searchValue && <div className={styles.box}>
                        {isLoading ? 'Loading' : !data?.length ? "No results" : data.map((id: string, images: string, title: string) => {
                            return (
                                <Link key={id} onClick={() => setSearchValue('')} className={styles.item}
                                      to={`/products/${id}`}>
                                    <div className={styles.image} style={{backgroundImage: `url(${images[0]})`}}/>
                                    <div className={styles.title}>
                                        {title}
                                    </div>
                                </Link>
                            )
                        })}
                    </div>}
                </form>
                <div className={styles.account}>
                    <Link to={ROUTES.HOME} className={styles.favourites}>
                        <AiTwotoneHeart/>
                    </Link>
                    <Link to={ROUTES.CART} className={styles.cart}>
                        <BiCart/>
                        {!!cart.length && (<span className={styles.count}>{cart.length}</span>)}
                    </Link>
                </div>
            </div>
        </div>
    );
};

