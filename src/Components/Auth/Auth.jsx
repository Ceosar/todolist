import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/use-theme";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import classes from './Auth.module.css';
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import { useNavigate } from "react-router-dom";
import './Auth.scss'

const Auth = ({ setLoggin }) => {

    let navigate = useNavigate();

    const { theme, setTheme } = useTheme();
    const [auth, setAuth] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);




    const handleThemeClick = () => {

        // document.getElementsByClassName("main")[0].
        setIsAnimating(!isAnimating)
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    /**
     * Движение заднего фона
     */
    // useEffect(() => {
    //     window.addEventListener('mousemove', function (e) {
    //         var bg = document.getElementsByClassName('auth-header')[0]
    //         var cont = document.getElementsByClassName('auth-content__h1')[0]
    //         let x = e.clientX / window.innerWidth;
    //         let y = e.clientY / window.innerHeight;
    //         bg.style.transform = 'translate(-' + x * 10 + 'px, -' + y * 10 + 'px)';
    //         cont.style.transform = 'translate(-' + x * 10 + 'px, -' + y * 10 + 'px)';
    //     });
    //     return () => {
    //         window.addEventListener('mousemove', function (e) {
    //             var bg = document.getElementsByClassName('auth-header')[0]
    //             var cont = document.getElementsByClassName('auth-content__h1')[0]
    //             let x = e.clientX / window.innerWidth;
    //             let y = e.clientY / window.innerHeight;
    //             bg.style.transform = 'translate(-' + x * 10 + 'px, -' + y * 10 + 'px)';
    //             cont.style.transform = 'translate(-' + x * 10 + 'px, -' + y * 10 + 'px)';
    //         });
    //     };
    // }, []);

    // document.addEventListener('mousemove', (e) => {
    //     var bg = document.getElementsByClassName('auth-container')[0]
    //     var amountMovedX = (e.pageX * 1/6);
    //     var amountMovedY = (e.pageY * 1/6);
    //     bg.style.background = `amountMovedX + 'px ' + amountMovedY + 'px'`;
    // })

    const authAnimationFromUp = {
        hidden: {
            y: 300,
            opacity: 0
        },
        visible: custom => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: custom * 0.2,
                type: "spring"
            }
        })
    }

    return (
        <section className={"main " + theme}>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2, once: true }}
                className={classes.auth_container}
            >
                <header className={classes.auth_header}>
                    <motion.section
                        variants={authAnimationFromUp}
                        custom={9}
                        className={classes.auth_language}
                        onClick={() => { setLoggin(true); localStorage.setItem('loggin', true); }}
                    >
                        <button>RUS</button>
                    </motion.section>
                    <motion.div
                        variants={authAnimationFromUp}
                        custom={9}
                    >
                        <ThemeSwitcher event={handleThemeClick} />
                    </motion.div>
                </header>
                {auth ? <SignUp setAuth={setAuth} theme={theme} authAnimationFromUp={authAnimationFromUp} /> : <SignIn setAuth={setAuth} theme={theme} authAnimationFromUp={authAnimationFromUp} />}

            </motion.div>
        </section>

    );
}

export default Auth;