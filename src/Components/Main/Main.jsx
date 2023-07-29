import React, { useEffect } from 'react'
import './Main.scss'
import NawButton from './NawButton/NawButton'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { Outlet } from "react-router-dom";
import { redirect, useNavigate } from "react-router-dom";

export default function Main() {
 
    let navigate = useNavigate();

    useEffect(() => {
        navigate("/add/");
    }, [])

    return (
        <>
            <div className="main-contaner">
                <NawButton />
                <Outlet />
            </div>
        </>
    )
}
