import cls from "./Section.module.scss";
import type {ReactNode} from "react";
import { classNames } from "shared/lib/classNames/classNames";

interface SectionProps {
    title: string;
    children?: ReactNode;
    className?: string;
}

export const Section = ({ title, children, className }: SectionProps) => {
    return (
        <div className={classNames(cls.section, {}, [className])}>
            <div className="container">
                <h2 className={cls.sectionTitle}>{title}</h2>
            </div>
            {children}
        </div>
    );
};
