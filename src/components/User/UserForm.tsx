import React from 'react';
import {useAppSelector} from "../../hook";
import {UserSignupForm} from "./UserSignupForm";

export const UserForm = () => {
    const {showForm} = useAppSelector(({user}) => user)

    return (
        showForm ? <UserSignupForm/> : <></>
    );
};


