import React, {ChangeEvent, FC, FormEvent, useState} from 'react';

import styles from '../../styles/User.module.css';
import {RiCloseFill} from "@react-icons/all-files/ri/RiCloseFill";
import {useAppDispatch} from "../../hook";
import {createUser} from "../../features/user/userSlice";

export type ValuesType = {
    name: string,
    email: string,
    password: string,
    avatar: string
}

type UserSignupFormType = {
    onCloseForm: () => void
}
export const UserSignupForm: FC<UserSignupFormType> = ({onCloseForm}) => {
    const dispatch = useAppDispatch()
    const [values, setValues] = useState<ValuesType>({
        name: '',
        email: '',
        password: '',
        avatar: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setValues({
            ...values,
            [e.target.name]: value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const isNotEmpty = Object.values(values).some(val => !val)
        if(isNotEmpty) return
        dispatch(createUser(values))
        onCloseForm()
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.close}>
                <svg onClick={onCloseForm} className="icon">
                    <RiCloseFill/>
                </svg>
            </div>
            <div className={styles.title}>
                Sing Up
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <input type="email"
                           placeholder="Your email"
                           name="email"
                           value={values.email}
                           autoComplete="off"
                           onChange={handleChange}
                           required/>
                </div>
                <div className={styles.group}>
                    <input type="name"
                           placeholder="Your name"
                           name="name"
                           value={values.name}
                           autoComplete="off"
                           onChange={handleChange}
                           required/>
                </div>
                <div className={styles.group}>
                    <input type="password"
                           placeholder="Your password"
                           name="password"
                           value={values.password}
                           autoComplete="off"
                           onChange={handleChange}
                           required/>
                </div>
                <div className={styles.group}>
                    <input type="avatar"
                           placeholder="Your avatar"
                           name="avatar"
                           value={values.avatar}
                           autoComplete="off"
                           onChange={handleChange}
                           required/>
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


