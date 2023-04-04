import React from 'react';

import {useAppDispatch, useAppSelector} from "../../hook";

import {UserSignupForm} from "./UserSignupForm";

import styles from '../../styles/User.module.css';
import {toggleForm} from "../../features/user/userSlice";

export const UserForm = () => {
   const dispatch = useAppDispatch()
    const {showForm} = useAppSelector(({user}) => user)

    const onCloseForm = () => {
        dispatch(toggleForm(false))
    }

    return (
        showForm ? (
            <React.Fragment>
                <div onClick={onCloseForm} className={styles.overlay}/>
                <UserSignupForm onCloseForm={onCloseForm}/>
            </React.Fragment>
        ) : (<></>)
    )
};


