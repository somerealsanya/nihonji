import {jikanApi} from "../../../shared/api/jikanApi.ts";
import type {Anime} from "../model/anime.ts";


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
        getAnimePicture: build.query<Anime, string>({
            query: (id : string) => `/anime/${id}/pictures`,
            transformResponse: (resp: any) => resp.data
        })
    })
});

export const { useGetPopularAnimeQuery, useGetAnimeByIdQuery, useGetAnimePictureQuery } = animeApi;