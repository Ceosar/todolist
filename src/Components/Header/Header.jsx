import React from 'react'
import './Header.scss'
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher'
import { useNavigate } from "react-router-dom";


export default function Header() {

    let navigate = useNavigate();

    const logginOut = () => {
        localStorage.removeItem('loggin')
        navigate("/loggin/")
    }

    return (
        <>
            <div className='header-contaner'>
                <div className='logo' onClick={logginOut}>
                    Digital Owls
                </div>
                <div className='header-properties'>
                    <button className='language-place'>RUS</button>
                    <div className='toggle-place'>
                        <ThemeSwitcher />
                    </div>
                </div>
                {/* <div className="name">Петров петр петрович</div>
                <div className="loginOut">Выход</div> */}
            </div>
        </>
    )
}
