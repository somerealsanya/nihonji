
export interface Anime {
    mal_id: number;
    url: string;
    images: {
        jpg: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        };
        webp: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        };
    };
    trailer: {
        youtube_id: string | null;
        url: string | null;
        embed_url: string | null;
        images: {
            image_url: string | null;
            small_image_url: string | null;
            medium_image_url: string | null;
            large_image_url: string | null;
            maximum_image_url: string | null;
        };
    };
    approved: boolean;
    titles: {
        type: string;
        title: string;
    }[];
    title: string;            // основное название
    title_english: string | null;
    title_japanese: string | null;
    title_synonyms: string[];

    type: string | null;       // TV, movie, OVA и т.д.
    source: string | null;

    episodes: number | null;
    status: string;            // "Finished Airing", "Currently Airing"
    airing: boolean;

    aired: {
        from: string | null;
        to: string | null;
        prop: {
            from: { day: number | null; month: number | null; year: number | null };
            to: { day: number | null; month: number | null; year: number | null };
            string: string | null;
        };
    };

    duration: string | null;   // "24 min per ep"
    rating: string | null;     // PG-13, R+, etc.

    score: number | null;
    scored_by: number | null;

    rank: number | null;
    popularity: number | null;
    members: number | null;
    favorites: number | null;

    synopsis: string | null;
    background: string | null;

    season: string | null;     // spring, fall, winter
    year: number | null;

    broadcast: {
        day: string | null;
        time: string | null;
        timezone: string | null;
        string: string | null;
    };

    producers: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];

    licensors: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];

    studios: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];

    genres: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];

    explicit_genres: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];

    themes: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];

    demographics: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];

    relations: {
        relation: string;
        entry: {
            mal_id: number;
            type: string;
            name: string;
            url: string;
        }[];
    }[];

    theme: {
        openings: string[];
        endings: string[];
    };

    external: {
        name: string;
        url: string;
    }[];

    streaming: {
        name: string;
        url: string;
    }[];
}
