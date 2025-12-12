import React from "react";
import cls from "./LoginPage.module.scss";
import { useAuth } from "app/providers/auth/AuthProvider";
import {AuthForm} from "widgets/AuthForm";

export const LoginPage: React.FC = () => {
    const { login } = useAuth();

    const handleLogin = async ({ email, password }: { email: string; password: string }) => {
        // предполагается, что useAuth.login выбрасывает ошибку при неудаче
        await login(email, password);
    };

    return (
        <div className={cls.page}>
            <h1 className={cls.pageTitle}>Вход</h1>

            <AuthForm
                mode="login"
                onSubmit={handleLogin}
                submitLabel="Войти"
                switchLink={{ to: "/registration", text: "Нет аккаунта? Зарегистрироваться" }}
            />
        </div>
    );
};

export default LoginPage;
