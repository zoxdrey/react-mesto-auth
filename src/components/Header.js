import headerLogo from "../images/logo.svg";
import {useLocation} from "react-router";
import {NavLink} from "react-router-dom";

function Header({email, onSignOut}) {

    let {pathname} = useLocation()

    const getHeaderLink = () => {
        if (pathname === '/sign-in') {
            return (<NavLink className={'header__link'} to={'/sign-up'}>Регистрация</NavLink>)
        } else if (pathname === '/sign-up') {
            return (<NavLink className={'header__link'} to={'/sign-in'}>Войти</NavLink>)
        } else {
            return (<NavLink className={'header__link'} to={'/sign-in'} onClick={onSignOut}>Выйти</NavLink>)
        }
    }

    return (<header className="header">
        <img
            alt="Место лого"
            className="header__logo"
            src={headerLogo}
        />
        <div className={'header__text-wrapper'}>
            {email && (<div className={'header__user-email'}>{email}</div>)}
            {getHeaderLink()}
        </div>
    </header>)
}

export default Header