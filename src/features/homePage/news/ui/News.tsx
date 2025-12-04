import cls from './News.module.scss';
import {classNames} from "../../../../shared/lib/classNames/classNames.ts";


interface NewsProps {
    className?: string;
}

export interface News {
    title: string;
    date: string;   // ISO-строка или читабельная (пример: "2025-12-01")
    author: string;
    img: string;    // URL к изображению / локальный путь / placeholder
}

export const mockNews: News[] = [
    {
        title: "Новый сезон «Сумеречные крылья» подтвердил дату выхода",
        date: "2025-11-28",
        author: "Мария Кононова",
        img: "https://a.storyblok.com/f/178900/1920x1080/3290dd3757/demon-slayer-kimetsu-no-yaiba-hashira-training-arc-episode-1.jpg/m/1200x0/filters:quality(95)format(webp)"
    },
    {
        title: "Интервью с режиссёром студии Kibo: о вдохновении и планах",
        date: "2025-11-20",
        author: "Алексей Романов",
        img: "https://a.storyblok.com/f/178900/1263x711/7e56733d55/yuri-on-ice-the-movie-ice-adolescense.png/m/1200x0/filters:quality(95)format(webp)"
    },
    {
        title: "Топ-10 неожиданных саундтреков в аниме 2025 года",
        date: "2025-10-30",
        author: "Nihonji Editorial",
        img: "https://a.storyblok.com/f/178900/1920x1080/636906bab5/solo-leveling.jpg/m/1200x0/filters:quality(95)format(webp)"
    },
    {
        title: "Как выбрать аниме для выходных: гид по жанрам",
        date: "2025-09-15",
        author: "София Ибрагимова",
        img: "https://a.storyblok.com/f/178900/1920x1080/3fbb4c4a33/konosuba-season-3.jpg/m/1200x0/filters:quality(95)format(webp)"
    },
    {
        title: "Рестайлинг классики: ресторированные версии «Летнего острова»",
        date: "2025-08-02",
        author: "Ильдар Фаритов",
        img: "https://a.storyblok.com/f/178900/900x506/9455bf4dcc/frieren-avatar-header.jpeg/m/576x0/filters:quality(95)format(webp)"
    },
    {
        title: "Фанаты выбрали лучший персонаж года — итоги голосования",
        date: "2025-07-23",
        author: "Команда Nihonji",
        img: "https://a.storyblok.com/f/178900/960x540/e94502e17d/doctor-elise.jpg/m/filters:quality(95)format(webp)"
    },
    {
        title: "Мастхев: 12 коротких аниме, если у тебя мало времени",
        date: "2025-06-11",
        author: "Екатерина Ли",
        img: "https://a.storyblok.com/f/178900/960x540/4890a8d51a/spy-x-family.jpg/m/filters:quality(95)format(webp)"
    },
    {
        title: "Как студенты создали мини-сериал и попали на фестиваль",
        date: "2025-05-04",
        author: "Роман Петухов",
        img: "https://a.storyblok.com/f/178900/960x540/7c174fb994/returner-s-magic.jpg/m/filters:quality(95)format(webp)"
    }
];

export const News = ({className}: NewsProps) => {
    return (
        <div className={classNames(cls.News, {}, [className])}>
            <div className="container">
                <h2>Новости Nihonji</h2>
                <span className={cls.sectionLabel}>Последние</span>

                <div className={cls.newsColumnsWrapper}>
                    {mockNews.map((news, index) => (
                        <div
                            key={news.title}
                            className={classNames(
                                cls.newsItem,
                                { [cls.newsGeneral]: index < 2 }
                            )}
                        >
                            <img src={news.img} alt={news.title} />
                            <div className={cls.newsContent}>
                                <span className="title">{news.title}</span>
                                <span className="date">{news.date}</span>
                                <span className="author">{news.author}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

