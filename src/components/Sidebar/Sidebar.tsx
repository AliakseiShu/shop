import React from 'react';
import {NavLink} from "react-router-dom";

import {RootState, } from "../../features/store";
import {useAppSelector} from "../../hook";

import styles from '../../styles/Sidebar.module.css';


export const Sidebar = () => {
    const {list} = useAppSelector((categories: RootState) => categories.categories)
    //console.log('list', list)
    return (
        <section className={styles.sidebar}>
            <div className={styles.title}>CATEGORIES</div>
            <nav>
                <ul className={styles.menu}>
                    {list.map(({id, name}) => (
                        <li key={id}>
                            <NavLink
                                className={({isActive}) =>
                                    `${styles.link} ${isActive ? styles.active : ''} `}
                                to={`/categories/${id}}`}>
                                {name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className={styles.footer}>
                <a href='/help'
                   target="_blank"
                   className={styles.link}>Help
                </a>
                <a href='/terms'
                   target="_blank"
                   className={styles.link} style={{textDecoration: "underline"}}>Terms & Conditions
                </a>
            </div>
        </section>
    );
};


