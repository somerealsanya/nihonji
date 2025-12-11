import React from "react";
import cls from "./StaffCard.module.scss";
import type { AnimeStaff } from "../../../../entities/anime/model/anime";
import { pickImage } from "../../../../shared/utils/animeHelpers";

type Props = {
    s: AnimeStaff | any;
    posterFallback?: string;
};

export const StaffCard: React.FC<Props> = ({ s, posterFallback }) => {
    const person = s.person || s;
    const name = person?.name || s.name || "—";
    const img = pickImage(person, posterFallback);
    const pos = s.positions?.join?.(", ") ?? s.role ?? "—";

    return (
        <div className={cls.card}>
            <img className={cls.thumb} src={img} alt={name} />
            <div className={cls.info}>
                <div className={cls.name}>{name}</div>
                <div className={cls.pos}>{pos}</div>
            </div>
        </div>
    );
};

export default StaffCard;
