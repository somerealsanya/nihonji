import React from "react";
import cls from "./RegistrationPage.module.scss";
import { useAuth } from "app/providers/auth/AuthProvider";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "shared/lib/firebase/firebase";
import {AuthForm} from "widgets/AuthForm";

export const RegisterPage: React.FC = () => {
    const { register } = useAuth();

    const handleRegister = async ({ email, password }: { email: string; password: string }) => {
        await register(email, password);

        // если регистрация прошла успешно — отправляем верификацию (как в твоём коде)
        if (auth.currentUser) {
            await sendEmailVerification(auth.currentUser);
            // можно показать сообщение пользователю; в текущей простой реализации AuthForm показ вериф. не подключён
            // но можно расширить: возвращать из этой функции флаг, и в AuthForm отобразить сообщение.
        }
    };

    return (
        <div className={cls.page}>
            <h1 className={cls.pageTitle}>Регистрация</h1>

            <AuthForm
                mode="register"
                onSubmit={handleRegister}
                submitLabel="Зарегистрироваться"
                switchLink={{ to: "/login", text: "Уже есть аккаунт?" }}
            />
        </div>
    );
};

export default RegisterPage;
