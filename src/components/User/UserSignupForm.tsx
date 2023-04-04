import React, {ChangeEvent, useState} from 'react';

import styles from '../../styles/User.module.css';
import {RiCloseFill} from "@react-icons/all-files/ri/RiCloseFill";

type ValuesType = {
    name: string,
    email: string,
    password: string,
    avatar: string
}

export const UserSignupForm = () => {
    const [values, setValues] = useState<ValuesType>({
        name: '',
        email: '',
        password: '',
        avatar: ''
    })

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setValues({
            ...values,
            [e.target.name]: value
        })
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.close}>
                <svg className="icon">
                    <RiCloseFill/>
                </svg>
            </div>
            <div className={styles.title}>
                Sing Up
            </div>
            <form className={styles.form}>
                <div className={styles.group}>
                    <input type="email"
                           placeholder="Your email"
                           name="email"
                           value={values.email}
                           autoComplete="off"
                           onChange={handleChange}/>
                </div>
                <div className={styles.group}>
                    <input type="name"
                           placeholder="Your name"
                           name="name"
                           value={values.name}
                           autoComplete="off"
                           onChange={handleChange}/>
                </div>
                <div className={styles.group}>
                    <input type="password"
                           placeholder="Your password"
                           name="password"
                           value={values.password}
                           autoComplete="off"
                           onChange={handleChange}/>
                </div>
                <div className={styles.group}>
                    <input type="avatar"
                           placeholder="Your avatar"
                           name="avatar"
                           value={values.avatar}
                           autoComplete="off"
                           onChange={handleChange}/>
                </div>
                <div className={styles.link}>
                    I already have an account
                </div>
                <button type="submit" className={styles.submit}>
                    Create an account
                </button>
            </form>
        </div>
    );
};


