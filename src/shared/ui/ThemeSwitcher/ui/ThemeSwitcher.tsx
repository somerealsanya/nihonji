import {classNames} from "shared/lib/classNames/classNames";
import cls from './ThemeSwitcher.module.scss';
import {Moon} from "lucide-react";
import {useTheme} from "app/providers/theme/lib/useTheme.ts";


interface ThemeSwitcherProps {
    className?: string;
}


export const ThemeSwitcher = ({className}: ThemeSwitcherProps) => {
    const {theme, toggleTheme} = useTheme();

    return (
        <button className={classNames(cls.ThemeSwitcher, {}, [className])} onClick={toggleTheme}>
            <Moon />
        </button>
    );
};

