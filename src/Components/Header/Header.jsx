import React from 'react'
import './Header.scss'
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher'

export default function Header({ setLoggin }) {

    const logginOut = () => {
        localStorage.removeItem('loggin')
        setLoggin(false);
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
