import classes from "./MenuBar.module.css"
import icon_home from './../../assets/icon_home.svg'
import icon_idea from './../../assets/icon_idea.svg'
import icon_profile from './../../assets/icon_profile.svg'
import icon_plus from './../../assets/icon_plus.svg'
import icon_trash from './../../assets/icon_trash.svg'

const MenuBar = () => {
    return (
        <div className={classes.menu_bar}>
            <section className={classes.menu_section}>
                <button>
                    <div className={classes.menu_btn}>
                        <div className={classes.line_menu}></div>
                        <div className={classes.line_menu}></div>
                        <div className={classes.line_menu}></div>
                    </div>
                </button>
            </section>
            <section className={classes.menu_up_side}>
                <button>
                    <img src={icon_home} alt="" />
                </button>
                <button>
                    <img src={icon_idea} alt="" />
                </button>
                <button>
                    <img src={icon_profile} alt="" />
                </button>
                <button>
                    <img src={icon_home} alt="" />
                </button>
            </section>
            <section className={classes.menu_down_side}>
                <button>
                    <img src={icon_plus} alt="" />
                </button>
                <button>
                    <img src={icon_trash} alt="" />
                </button>
            </section>
        </div>
    );
}

export default MenuBar;