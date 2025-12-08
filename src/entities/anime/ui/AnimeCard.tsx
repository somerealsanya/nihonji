import cls from './AnimeCard.module.scss';
import {Star} from "lucide-react";
import type {Anime} from "../model/anime.ts";
import {classNames} from "../../../shared/lib/classNames/classNames.ts";


interface AnimeCardProps {
    anime: Anime;
    className?: string;
}


export const AnimeCard = ({anime, className}: AnimeCardProps) => {
    return (
        <div className={classNames(cls.AnimeCard, {}, [className])}>
            <img
                className={cls.animeImg}
                src={anime.images?.jpg?.image_url}
                alt={anime.title}
            />

            <h3 className={cls.animeName}>
                {anime.title_english || anime.title}
            </h3>

            <p className={cls.animeRating}>
                <Star />
                {anime.score ? anime.score.toFixed(1) : "N/A"}
            </p>
        </div>
    );
};


