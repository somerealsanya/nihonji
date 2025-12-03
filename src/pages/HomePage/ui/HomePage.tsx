import {Intro} from "../../../features/intro";
import styles from "./HomePage.module.scss";
import {Popular} from "../../../features/popular";
import {Novelty} from "../../../features/novelty";
import {AllTimeFavorites} from "../../../features/AllTimeFavorites";

const HomePage = () => {

    const animeList = [
        { id: 1, title: "Dandadan", rating: 8.6, img: "/anime/dandadan.jpg" },
        { id: 2, title: "Blue Lock S2", rating: 8.2, img: "/anime/bluelock.jpg" },
        { id: 3, title: "Kaiju No.8", rating: 8.4, img: "/anime/kaiju8.jpg" },
        { id: 4, title: "Solo Leveling S2", rating: 8.8, img: "/anime/sololeveling.jpg" },
        { id: 5, title: "Dandadan", rating: 8.6, img: "/anime/dandadan.jpg" },
        { id: 6, title: "Blue Lock S2", rating: 8.2, img: "/anime/bluelock.jpg" },
        { id: 7, title: "Kaiju No.8", rating: 8.4, img: "/anime/kaiju8.jpg" },
        { id: 8, title: "Solo Leveling S2", rating: 8.8, img: "/anime/sololeveling.jpg" }
    ];

    return (
        <main className={styles.homePage}>
            <Intro />

            <Popular animeList={animeList} />

            <Novelty animeList={animeList} />

            <AllTimeFavorites animeList={animeList} />

        </main>
    )
}

export default HomePage;