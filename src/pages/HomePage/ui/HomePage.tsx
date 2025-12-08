import {Intro} from "../../../features/homePage/intro";
import styles from "./HomePage.module.scss";
import {Popular} from "../../../features/homePage/popular";
import {Novelty} from "../../../features/homePage/novelty";
import {AllTimeFavorites} from "../../../features/homePage/AllTimeFavorites";
import {News} from "../../../features/homePage/news";
import {useEffect, useState} from "react";
import {AnimeService} from "../../../shared/api/services/AnimeService.ts";

const HomePage = () => {

    const [animeList, setAnimeList] = useState([]);

    useEffect(() => {
        const fetchAnime = async () => {
            const data = await AnimeService.getAnime();
            setAnimeList(data);
        }
        fetchAnime();
    }, []);

    return (
        <main className={styles.homePage}>
            <Intro />

            <div className={styles.upper}>
                <Popular animeList={animeList} />

                <Novelty animeList={animeList} />

                <News />

                <AllTimeFavorites animeList={animeList} />
            </div>
        </main>
    )
}

export default HomePage;