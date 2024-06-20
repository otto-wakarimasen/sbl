import s from "./LoginPage.module.css"

export const LoginPage = () => {
    return (
        <h1>
            <form className={s.loginForm}>
                <h2>Авторизация</h2>
                <div><input className={s.loginFormInput} type="text" placeholder="Логин" required/></div>
                <div><input className={s.loginFormInput} type="password" placeholder="Пароль" required/></div>
                <div><button className="blackBtn" type="submit">Войти</button>
                </div>
            </form>
        </h1>
    )
}