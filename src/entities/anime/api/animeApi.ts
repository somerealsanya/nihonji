import {jikanApi} from "../../../shared/api/jikanApi.ts";
import type {
    Anime,
    AnimeCharacter,
    AnimePicture,
    AnimeRecommendation,
    AnimeRecommendation,
    AnimeStaff
} from "../model/anime.ts";


export const animeApi = jikanApi.injectEndpoints({
    endpoints: (build) => ({
        getPopularAnime: build.query<Anime[], void>({
            query: () => `/anime?order_by=popularity`,
            transformResponse: (resp: any) => resp.data
        }),
        getAnimeById: build.query<Anime, string>({
            query: (id : string) => `/anime/${id}/full`,
            transformResponse: (resp: any) => resp.data
        }),
        getAnimePicture: build.query<AnimePicture, string>({
            query: (id : string) => `/anime/${id}/pictures`,
            transformResponse: (resp: any) => resp.data
        }),
        getAnimeCharacters: build.query<AnimeCharacter, string>({
            query: (id : string) => `/anime/${id}/characters`,
            transformResponse: (resp: any) => resp.data
        }),
        getAnimeRecommendations: build.query<AnimeRecommendation, string>({
            query: (id : string) => `/anime/${id}/recommendations`,
            transformResponse: (resp: any) => resp.data
        }),
        getAnimeStaff: build.query<AnimeStaff, string>({
            query: (id : string) => `/anime/${id}/staff`,
            transformResponse: (resp: any) => resp.data
        })
    })
});

export const {
    useGetPopularAnimeQuery,
    useGetAnimeByIdQuery,
    useGetAnimePictureQuery,
    useGetAnimeCharactersQuery,
    useGetAnimeRecommendationsQuery ,
    useGetAnimeStaffQuery
} = animeApi;