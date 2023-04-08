import React from 'react';

import {useAppDispatch, useAppSelector} from "../../hook";

import {UserSignupForm} from "./UserSignupForm";

import styles from '../../styles/User.module.css';
import {toggleForm, toggleFormType} from "../../features/user/userSlice";
import {UserLoginForm} from "./UserLoginForm";

export const UserForm = () => {
    const dispatch = useAppDispatch()
    const {showForm, formType} = useAppSelector(({user}) => user)

    const onCloseForm = () => {
        dispatch(toggleForm(false))
    }
    const toggleCurrentFormType = (type: string) => {
        dispatch(toggleFormType(type))
    }

    return (
        showForm ? (
            <React.Fragment>
                <div onClick={onCloseForm} className={styles.overlay}/>
                {formType === 'signup'
                    ? (<UserSignupForm toggleCurrentFormType={toggleCurrentFormType} onCloseForm={onCloseForm}/>)
                    : (<UserLoginForm toggleCurrentFormType={toggleCurrentFormType} onCloseForm={onCloseForm}/>)})
            </React.Fragment>
        ) : (<></>)
    )
};


