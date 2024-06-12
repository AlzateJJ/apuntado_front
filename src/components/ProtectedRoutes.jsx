import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { getLoggedUserThunk } from '../store/states/users.slice';
import { useDispatch, useSelector } from 'react-redux';

const ProtectedRoutes = () => {

    // const getToken = () => localStorage.getItem("token");
    // const token = localStorage.getItem("token");

    const user = useSelector(store => store.user);
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getLoggedUserThunk())
    }, [])
    
    console.log(user)

    if (localStorage.getItem('token')) { // PENDIENTE: Arreglar login
        console.log('entré al outlet')
        return <Outlet />
    } else {
        console.log('me rechazaron del home')
        return <Navigate to = '/' />
    }
}

export default ProtectedRoutes