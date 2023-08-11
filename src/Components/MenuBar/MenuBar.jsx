import classes from "./MenuBar.module.css"
import icon_home from './../../assets/icon_home.svg'
import icon_idea from './../../assets/icon_idea.svg'
import icon_profile from './../../assets/icon_profile.svg'
import icon_plus from './../../assets/icon_plus.svg'
import icon_trash from './../../assets/icon_trash.svg'
import icon_exit from './../../assets/icon_exit.svg'
import icon_menu from './../../assets/icon_menu.svg'
import { NavLink } from "react-router-dom"

const MenuBar = () => {
    return (
        <div className={classes.menu_bar}>
            <section className={classes.menu_section}>
                <button>
                    <div className={classes.menu_btn}>
                        {/* <div className={classes.line_menu}></div>
                        <div className={classes.line_menu}></div>
                        <div className={classes.line_menu}></div> */}
                        <img src={icon_menu} alt="" />
                    </div>
                </button>
            </section>
            <section className={classes.menu_up_side}>
                <NavLink className={classes.button}>
                    <img src={icon_home} alt="" />
                </NavLink>
                <NavLink className={classes.button} to="/zad">
                    <img src={icon_idea} alt="" />
                </NavLink>
                <NavLink className={classes.button}>
                    <img src={icon_profile} alt="" />
                </NavLink>
                <NavLink className={classes.button}>
                    <img src={icon_exit} alt="" />
                </NavLink>
            </section>
            <section className={classes.menu_down_side}>
                <NavLink className={classes.button} to="/add">
                    <img src={icon_plus} alt="" />
                </NavLink>
                <NavLink className={classes.button}>
                    <img src={icon_trash} alt="" />
                </NavLink>
            </section>
        </div>
    );
}

export default MenuBar;