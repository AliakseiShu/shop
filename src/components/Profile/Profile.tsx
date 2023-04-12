import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';

import styles from '../../styles/Profile.module.css';

import {useAppDispatch, useAppSelector} from "../../hook";
import {ValuesType} from "../User/UserSignupForm";
import {updateUser} from "../../features/user/userSlice";

export const Profile = () => {
    const dispatch = useAppDispatch()

    const {currentUser} = useAppSelector(({user})=> user)

    const [values, setValues] = useState<ValuesType>({
        id:'',
        name: '',
        email: '',
        password: '',
        avatar: ''
    })

    useEffect(() => {
        if (!currentUser) return
        setValues(currentUser)
    }, [currentUser]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setValues({
            ...values,
            [e.target.name]: value
        })
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const isNotEmpty = Object.values(values).every(val => val)
        if (!isNotEmpty) return
        dispatch(updateUser(values))
    }

    return (
        <section className={styles.profile}>
            {!currentUser ? <span>You need to log in</span> : (
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
                    <button type="submit" className={styles.submit}>
                        Update
                    </button>
                </form>
            )}
        </section>
    );
};

