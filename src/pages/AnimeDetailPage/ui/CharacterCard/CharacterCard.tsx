import React from "react";
import cls from "./CharacterCard.module.scss";
import type { AnimeCharacter } from "../../../../entities/anime/model/anime";
import { pickImage } from "../../../../shared/utils/animeHelpers";

type Props = {
    c: AnimeCharacter | any;
    posterFallback?: string;
};

export const CharacterCard: React.FC<Props> = ({ c, posterFallback }) => {
    const charObj = c.character || c;
    const name = charObj?.name ?? "—";
    const thumb = pickImage(charObj, posterFallback);
    const role = c.role || charObj?.role || "—";
    const va = c.voice_actors || [];

    return (
        <div className={cls.card}>
            <img className={cls.thumb} src={thumb} alt={name} />
            <div className={cls.info}>
                <div className={cls.name}>{name}</div>
                <div className={cls.role}>{role}</div>
                {va.length > 0 && <div className={cls.va}>{va.slice(0, 2).map((v: any) => v.person?.name || v.name).join(", ")}</div>}
            </div>
        </div>
    );
};

export default CharacterCard;
