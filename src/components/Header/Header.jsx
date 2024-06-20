import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

export const Header = () => {
    return (
        <header className={s.mainHeader}>
            <nav>
                <NavLink style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
                    exact to="/">Home</NavLink>
                <NavLink style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
                    exact to="/login">Login</NavLink>
            </nav>
        </header>
    )
}