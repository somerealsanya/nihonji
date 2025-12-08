import api from "../api.ts";
import type {Anime} from "../../../entities/anime/model/anime.ts";


export class AnimeService {
    static async getAnime(): Promise<Anime[]> {
        try {
            const resp = await api.get(`/anime?order_by=popularity`);
            return resp.data.data;
        } catch (err) {
            console.log(err);
            return [];
        }
    }
}