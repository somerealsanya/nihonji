import {jikanApi} from "../../../shared/api/jikanApi.ts";
import type {Anime} from "../model/anime.ts";


export const animeApi = jikanApi.injectEndpoints({
    endpoints: (build) => ({
        getPopularAnime: build.query<Anime[], void>({
            query: () => `/anime?order_by=popularity`,
            transformResponse: (resp: any) => resp.data
        })
    })
});

export const { useGetPopularAnimeQuery } = animeApi;