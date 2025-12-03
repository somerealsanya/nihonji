import cls from './Popular.module.scss';
import {classNames} from "../../../shared/lib/classNames/classNames.ts";
import {SwiperSlide} from "swiper/react";
import "swiper/css";
import {AnimeCard} from "../../../entities/anime";
import type {Anime} from "../../../entities/anime/model/anime.ts";
import {SwiperBlock} from "../../../shared/ui/SwiperBlock";

interface PopularProps {
    animeList: Anime[];
    className?: string;
}

export const Popular = ({animeList, className}: PopularProps) => {


    return (
        <div className={classNames(cls.Popular, {}, [className])}>
            <div className="container">
                <h2 className={cls.sectionTitle}>Популярные в этом сезоне</h2>
            </div>
            <SwiperBlock>
                {animeList.map(anime => (
                    <SwiperSlide key={anime.id} >
                        <AnimeCard anime={anime}/>
                    </SwiperSlide>
                ))}
            </SwiperBlock>
        </div>
    );
};

