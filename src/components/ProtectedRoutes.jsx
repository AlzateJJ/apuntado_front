import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {

    // const getToken = () => localStorage.getItem("token");
    // const token = localStorage.getItem("token");
    
    // console.log(token)
    if (localStorage.getItem('token')) { // PENDIENTE: Arreglar login
        console.log('entré al outlet')
        return <Outlet />
    } else {
        console.log('me rechazaron del home')
        return <Navigate to = '/' />
    }
}

export default ProtectedRoutes