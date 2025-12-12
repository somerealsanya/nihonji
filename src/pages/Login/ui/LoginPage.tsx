import React, { useState } from "react";
import cls from "./LoginPage.module.scss";
import { useAuth } from "app/providers/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "shared/lib/firebase/firebase.ts";
import {Eye, EyeOff} from "lucide-react";

export const RegisterPage: React.FC = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sentVerification, setSentVerification] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email) return setError("Введите email");
        if (password.length < 8) return setError("Пароль должен содержать минимум 8 символов");
        if (password !== confirm) return setError("Пароли не совпадают");

        setLoading(true);
        try {
            await register(email, password);

            if (auth.currentUser) {
                await sendEmailVerification(auth.currentUser);
                setSentVerification(true);
            }
        } catch (err: any) {
            const msg = String(err?.message ?? err);
            if (msg.includes("email-already")) setError("Этот email уже зарегистрирован");
            else if (msg.includes("invalid-email")) setError("Неверный email");
            else setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cls.page}>
            <h1 className={cls.pageTitle}>Регистрация</h1>

            {sentVerification ? (
                <div className={cls.verificationMessage}>
                    Письмо с подтверждением отправлено на <strong>{email}</strong>.
                    Проверьте почту!
                    <button className={cls.loginBtn} onClick={() => navigate("/login")}>
                        Перейти ко входу
                    </button>
                </div>
            ) : (
                <form className={cls.form} onSubmit={onSubmit}>
                    <div className={cls.field}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            placeholder="you@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={cls.field}>
                        <label>Пароль</label>
                        <div className={cls.passwordRow}>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                placeholder="Минимум 8 символов"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                type="button"
                                className={cls.showBtn}
                                onClick={() => setShowPassword((s) => !s)}
                            >
                                {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                        </div>

                    </div>

                    <div className={cls.field}>
                        <label>Повторите пароль</label>
                        <input
                            type="password"
                            value={confirm}
                            placeholder="Введите пароль ещё раз"
                            onChange={(e) => setConfirm(e.target.value)}
                        />
                    </div>

                    {error && <div className={cls.error}>{error}</div>}

                    <button className={cls.submit} type="submit" disabled={loading}>
                        {loading ? "Создаём..." : "Зарегистрироваться"}
                    </button>

                    <button type="button" className={cls.loginLink} onClick={() => navigate("/login")}>
                        Уже есть аккаунт?
                    </button>
                </form>
            )}
        </div>
    );
};

export default RegisterPage;
