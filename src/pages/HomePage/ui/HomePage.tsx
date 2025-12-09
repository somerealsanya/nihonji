import {Intro} from "../../../features/homePage/intro";
import cls from "./HomePage.module.scss";
import {Popular} from "../../../features/homePage/popular";
import {Novelty} from "../../../features/homePage/novelty";
import {AllTimeFavorites} from "../../../features/homePage/AllTimeFavorites";
import {News} from "../../../features/homePage/news";
import {useGetPopularAnimeQuery} from "../../../entities/anime/api/animeApi.ts";
import {Loader} from "../../../shared/ui/Loader";

const HomePage = () => {

    const {data, error, isLoading} = useGetPopularAnimeQuery();

    if (isLoading) {
        return (
            <div className={cls.loader}>
                <Loader />
            </div>
        )
    }

    const animeList = data ?? [];

    return (
        <main className={cls.homePage}>
            <Intro />

            <div className={cls.upper}>
                <Popular animeList={animeList} />

                <Novelty animeList={animeList} />

                <News />

                <AllTimeFavorites animeList={animeList} />
            </div>
        </main>
    )
}

export default HomePage;