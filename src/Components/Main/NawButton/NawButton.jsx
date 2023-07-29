import React, { useState, useEffect } from 'react'
import './NawButton.scss'
import { NavLink, useLocation } from "react-router-dom";


export default function NawButton() {

    const [navLink, setNavLink] = useState("zad")
    const location = useLocation()

    return (
        <div className="NawButtons">
            <NavLink className="zad" to={`zad/`}>Задачи</NavLink>
            <NavLink className="add" to={`add/`}>Добавить</NavLink>
        </div>
    )
}
