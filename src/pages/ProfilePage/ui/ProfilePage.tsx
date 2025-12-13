import React, { useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ProfilePage.module.scss";
import { useAuth } from "app/providers/auth/AuthProvider";
import { auth } from "shared/lib/firebase/firebase";
import { sendEmailVerification } from "firebase/auth";
import { Mail, CheckCircle, XCircle, RotateCw, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProfilePageProps {
    className?: string;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ className }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [loadingResend, setLoadingResend] = useState(false);
    const [loadingCheck, setLoadingCheck] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleResend = async () => {
        if (!auth.currentUser) return setMessage("Пользователь не найден.");
        setMessage(null);
        setLoadingResend(true);
        try {
            await sendEmailVerification(auth.currentUser);
            setMessage("Письмо с подтверждением отправлено. Проверьте папку «Спам».");
        } catch (err: any) {
            setMessage(String(err?.message ?? "Ошибка при отправке"));
        } finally {
            setLoadingResend(false);
        }
    };

    const handleCheckNow = async () => {
        if (!auth.currentUser) return setMessage("Пользователь не найден.");
        setMessage(null);
        setLoadingCheck(true);
        try {
            await auth.currentUser.reload();
            if (auth.currentUser.emailVerified) setMessage("Email подтверждён.");
            else setMessage("Email всё ещё не подтверждён.");
        } catch (err: any) {
            setMessage(String(err?.message ?? "Ошибка при проверке"));
        } finally {
            setLoadingCheck(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/", { replace: true });
        } catch (err: any) {
            setMessage(String(err?.message ?? "Ошибка при выходе"));
        }
    };

    if (!user) {
        return (
            <div className={classNames(cls.ProfilePage, {}, [className])}>
                <header className={cls.hero}>
                    <div className={cls.heroBg} />
                    <div className={cls.heroPanel}>
                        <div className={cls.container}>
                            <div className={cls.centerCard}>
                                <div className={cls.empty}>Вы не вошли в систему.</div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }

    const displayName = user.displayName ?? user.email?.split("@")[0] ?? "User";

    return (
        <div className={classNames(cls.ProfilePage, {}, [className])}>
            <header className={cls.hero}>
                <div className={cls.heroBg} />
                <div className={cls.heroPanel}>
                    <div className={cls.container}>
                        <div className={cls.profileCard}>
                            <div className={cls.leftBlock}>
                                <div className={cls.info}>
                                    <h1 className={cls.title}>{displayName}</h1>

                                    <div className={cls.emailRow}>
                                        <div className={cls.email}>
                                            <Mail className={cls.icon} />
                                            <span className={cls.email}>{user.email}</span>
                                        </div>

                                        {user.emailVerified ? (
                                            <span className={cls.verified}>
                                                <CheckCircle className={cls.verifiedIcon} /> Подтвержён
                                            </span>
                                        ) : (
                                            <span className={cls.notVerified}>
                                                <XCircle className={cls.notVerifiedIcon} /> Не подтверждён
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={cls.actions}>
                                {!user.emailVerified && (
                                    <div className={cls.verifRow}>
                                        <button className={cls.ghostBtn} onClick={handleResend} disabled={loadingResend}>
                                            {loadingResend ? <><RotateCw className={cls.spin} /> Отправка...</> : "Отправить подтверждение"}
                                        </button>

                                        <button className={cls.ghostBtn} onClick={handleCheckNow} disabled={loadingCheck}>
                                            {loadingCheck ? <><RotateCw className={cls.spin} /> Проверка...</> : "Проверить сейчас"}
                                        </button>
                                    </div>
                                )}

                                <button className={cls.logoutBtn} onClick={handleLogout}>
                                    <LogOut className={cls.btnIcon} /> Выйти
                                </button>

                                {message && <div className={cls.message}>{message}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default ProfilePage;
