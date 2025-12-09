
export const AppRoutes  = {
    HOME: 'home',
    CATALOG: 'catalog',
    NOVELTY: 'novelty',
    POPULAR: 'popular',
    ANIME_DETAIL_PAGE: 'anime-detail-page'
} as const;

export type AppRoutes = typeof AppRoutes[keyof typeof AppRoutes];

export const routePaths: Record<AppRoutes, string> = {
    [AppRoutes.HOME]: '/',
    [AppRoutes.CATALOG]: '/catalog',
    [AppRoutes.NOVELTY]: '/novelty',
    [AppRoutes.POPULAR]: '/popular',
    [AppRoutes.ANIME_DETAIL_PAGE]: '/anime/:id'
}

