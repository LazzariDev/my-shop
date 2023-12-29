import { FormEvent, useEffect } from "react"
import { useLogin } from "./hooks/useLogin";
import { selectAuthError, selectAuthIsLogged, useAuth } from "@/services/auth";
import { ServerError } from "@/shared/";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
    const {
        formData, isValid, changeHandler
    } = useLogin();

    const navigate = useNavigate();

    const login = useAuth(state => state.login);
    const error = useAuth(selectAuthError);
    const isLogged = useAuth(selectAuthIsLogged);

    useEffect(() => {
        if (isLogged) {
            navigate('/cms');
        }
    }, [isLogged])

    function doLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        login(formData.username, formData.password)
    }

    return (
        <div className="page-sm">
            <h1 className="title"> LOGIN </h1>

            {error && < ServerError />}

            <form className="flex flex-col gap-3" onSubmit={doLogin}>
                <input
                type="text"
                placeholder="username"
                onChange={changeHandler}
                value={formData.username}
                name="username"
            />
                <input
                type="password"
                placeholder="password"
                onChange={changeHandler}
                value={formData.password}
                name="password"
            />
                <button className="btn primary" type="submit" disabled={!isValid}>SIGN IN</button>
            </form>
        </div>
    )
}
