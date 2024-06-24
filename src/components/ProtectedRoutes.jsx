import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { getLoggedUserThunk } from '../store/states/users.slice';
import { useDispatch, useSelector } from 'react-redux';

const ProtectedRoutes = () => {

    // const getToken = () => localStorage.getItem("token");
    // const token = localStorage.getItem("token");

    const dispatch = useDispatch()
    const user = useSelector(store => store.user);
    
    useEffect(() => {
        dispatch(getLoggedUserThunk())
    }, [])
    // console.log(user)
    
    if (localStorage.getItem('token')) { // PENDIENTE: Arreglar login
        console.log('hay token')
        
        return <Outlet />
        // if (user?.gameId) {
        //     console.log('estoy jugando, entro a waitingroom')
        //     return <Outlet /> // <Navigate to = {`/waitingroom/${user.gameId}`} />
        // } else {
        //     console.log('no estoy jugando, entro al home')
        //     return <Navigate to = '/home' />
        // }

    } else {
        console.log('me rechazaron del home')
        return <Navigate to = '/' />
    }
}

export default ProtectedRoutes