import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

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

export const Header = () => {
    const dispatch = useAppDispatch()
    const {currentUser} = useAppSelector(({user}) => user)

    const [values, setValues] = useState<ValuesType>({
        name: 'Guest',
        email: '',
        password: '',
        avatar: AVATAR

    });
    console.log(values)

    useEffect(() => {
        if (!currentUser) return
       setValues(currentUser)
    }, [currentUser]);


    const handleClick = () => {
        if (!currentUser) dispatch(toggleForm(true))
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
                               onChange={() => {
                               }}
                               value=""/>
                    </div>
                    {false && <div className={styles.box}></div>}

                </form>
                <div className={styles.account}>
                    <Link to={ROUTES.HOME} className={styles.favourites}>
                        <AiTwotoneHeart/>
                    </Link>
                    <Link to={ROUTES.CART} className={styles.cart}>
                        <BiCart/>
                        <span className={styles.count}>2</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};


/*
export const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link to={ROUTES.HOME}>
                    <img src={LOGO} alt="LOGO"/>
                </Link>
            </div>
            <div className={styles.info}>
                <div className={styles.user}>
                    <div className={styles.avatar} style={{backgroundImage: `url(${AVATAR})`}}/>
                    <div className={styles.username}>Guest</div>
                </div>
                <form className={styles.form}>
                    <div className={styles.icon}>
                        <svg className="icon">
                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`}/>
                        </svg>
                    </div>
                    <div className={styles.input}>
                        <input type="search"
                               name="search"
                               placeholder="Search..."
                               autoComplete="off"
                               onChange={()=>{}}
                               value=""/>
                    </div>
                    <div className={styles.box}></div>
                </form>
                <div className={styles.account}>
                    <Link to={ROUTES.HOME} className={styles.favourites}>
                        <svg className="icon-fav">
                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`}/>
                        </svg>
                    </Link>
                    <Link to={ROUTES.CART} className={styles.cart}>
                        <svg className="icon-cart">
                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`}/>
                        </svg>
                        <span className={styles.count}>2</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};*/
