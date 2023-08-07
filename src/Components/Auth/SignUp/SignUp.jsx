import React from "react";
import { motion } from "framer-motion";
import classes from  './../Auth.module.css';

const SignUp = props => {
    const handleReadyClick = () => {
        var email = document.getElementById('email');
        var password = document.getElementById('password');
        var passwordAgain = document.getElementById('password-again');
        var warningText = document.getElementsByClassName('auth-warning-text');

        const contentOfWarningText =
            [
                "Please enter your Email addres!",
                "Please enter Password!"
            ]

        if (email.value === "") {
            warningText[0].textContent = contentOfWarningText[0];
            warningText[0].style.opacity = 1;
        } else if (password.value === "" || passwordAgain.value === "") {
            warningText[0].textContent = contentOfWarningText[1];
            warningText[0].style.opacity = 1;
        } else {
            warningText[0].textContent = "none";
            warningText[0].style.opacity = 0;
        }
    }

    const authAnimation = {
        hidden: {
            opacity: 0
        },
        visible: custom => ({
            opacity: 1,
            transition: { delay: custom * 0.2, }
        })
    }

    return (
        <motion.main
            initial="hidden"
            key={props.theme}
            whileInView="visible"
            viewport={{ amount: 0.2, once: true }}
            variants={props.authAnimationFromUp}
            custom={2}
            className="auth_main_container"
        >
            <motion.section
                variants={authAnimation}
                custom={7}
                className={classes.auth_content}
            >
                <h1 className={classes.auth_content__h1}>Sign Up</h1>
                <div className={classes.auth_welcome_text}>
                    <h2>Digital Owls</h2>
                    <p>Welcome YOU</p>
                </div>
                <input id="email" placeholder="Email" />
                <input type="password" id="password" placeholder="Password" />
                <input type="password" id="password-again" placeholder="Password again" />
                <p className={classes.auth_warning_text}>none</p>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="auth-ready-click"
                    onClick={handleReadyClick}>Ready</motion.button>
                <div className={classes.auth_another_enter}>Already have an account?<button className={classes.auth_go_to} onClick={() => {
                    props.setAuth(0);
                }}>Sign In</button></div>
            </motion.section>
        </motion.main>
    );
}

export default SignUp;