import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/use-theme";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import classes from './Auth.module.css';
// import './Auth-theme.css'

const Auth = () => {
    const { theme, setTheme } = useTheme();
    const [auth, setAuth] = useState(0);

    const handleThemeClick = () => {
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
        <section className={classes.auth_section}>
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
                    >
                        <button>RUS</button>
                    </motion.section>
                    <motion.button
                        variants={authAnimationFromUp}
                        custom={9}
                        className={classes.theme_toggle} onClick={handleThemeClick}
                    >
                        <aside className={classes.theme_logo}></aside>
                    </motion.button>
                </header>
                {auth ? <SignUp setAuth={setAuth} /> : <SignIn setAuth={setAuth} />}

            </motion.div>
        </section>
    );
}

export default Auth;