import React, {ChangeEvent, FC, FormEvent, useState} from 'react';

import styles from '../../styles/User.module.css';
import {RiCloseFill} from "@react-icons/all-files/ri/RiCloseFill";
import {useAppDispatch} from "../../hook";
import {authUser} from "../../features/user/userSlice";

export type ValuesLoginType = {
    email: string,
    password: string,
}

type UserSignupFormType = {
    onCloseForm: () => void
    toggleCurrentFormType: (type:string) => void
}
export const UserLoginForm: FC<UserSignupFormType> = ({onCloseForm, toggleCurrentFormType}) => {
    const dispatch = useAppDispatch()
    const [values, setValues] = useState<ValuesLoginType>({
        email: '',
        password: ''
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
        dispatch(authUser(values))
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
                    <input type="password"
                           placeholder="Your password"
                           name="password"
                           value={values.password}
                           autoComplete="off"
                           onChange={handleChange}
                           required/>
                </div>
                <div onClick={() => {
                    toggleCurrentFormType("signup")
                }} className={styles.link}>
                    Create an account
                </div>
                <button type="submit" className={styles.submit}>
                    Login
                </button>
            </form>
        </div>
    );
};


