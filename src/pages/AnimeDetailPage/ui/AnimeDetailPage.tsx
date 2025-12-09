import cls from './AnimeDetailPage.module.scss';
import { classNames } from "../../../shared/lib/classNames/classNames.ts";
import {  useParams } from "react-router";
import { Navigate } from "react-router-dom";
import { useGetAnimeByIdQuery, useGetAnimePictureQuery } from "../../../entities/anime/api/animeApi.ts";
import { Loader } from "../../../shared/ui/Loader";
import {ChevronDown, Heart, Star} from "lucide-react";

interface AnimeDetailPageProps {
    className?: string;
}

const formatDate = (iso?: string | null) => {
    if (!iso) return '—';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString();
};

const joinNames = (arr?: { name: string }[] | null) =>
    arr && arr.length ? arr.map((x) => x.name).join(', ') : '—';

export const AnimeDetailPage = ({ className }: AnimeDetailPageProps) => {
    const { id } = useParams<{ id: string }>();

    if (!id) return <Navigate to="/" replace />;

    const { data, error, isLoading, isFetching } = useGetAnimeByIdQuery(id);
    const { data: picturesData } = useGetAnimePictureQuery(id);

    const pictures: any[] = Array.isArray(picturesData) ? picturesData : (picturesData && Array.isArray((picturesData as any).pictures) ? (picturesData as any).pictures : []);

    if (isLoading) {
        return (
            <div className={classNames(cls.AnimeDetailPage, {}, [className])}>
                <div className={cls.center}><Loader /></div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className={classNames(cls.AnimeDetailPage, {}, [className])}>
                <div className={cls.center}>Не удалось загрузить данные. Попробуйте позже.</div>
            </div>
        );
    }

    const poster =
        data.images?.webp?.large_image_url ||
        data.images?.jpg?.large_image_url ||
        data.images?.jpg?.image_url ||
        '';

    console.log(data)

    return (
        <div className={classNames(cls.AnimeDetailPage, {}, [className])}>
            <header className={cls.hero}>
                <div
                    className={cls.heroBg}
                    style={{
                        backgroundImage: `url(${data.images?.jpg?.large_image_url || data.images?.webp?.large_image_url || ''})`
                    }}
                />

                <div className={cls.heroPanel}>
                    <div className={cls.container}>
                        <div className={cls.posterCard}>
                            {poster ? (
                                <img src={poster} alt={data.title} className={cls.poster} />
                            ) : (
                                <div className={cls.posterPlaceholder}>No image</div>
                            )}
                            <div className={cls.actions}>
                                <button className={cls.btnPrimary}>Add to List <span className={cls.arrow}><ChevronDown /></span></button>
                                <button className={cls.iconBtn}><Heart /></button>
                            </div>
                        </div>

                        <div className={cls.headMeta}>
                            <h1 className={cls.title}>{data.title}</h1>
                            <p className={cls.subTitle}>
                                {data.title_english ? `${data.title_english} — ` : ''}
                                {data.title_japanese ? <span className={cls.jp}>{data.title_japanese}</span> : null}
                            </p>
                            <p className={cls.synopsisShort}>{data.synopsis ? data.synopsis.slice(0, 360) + (data.synopsis.length > 360 ? '...' : '') : 'Описание отсутствует.'}</p>

                            <nav className={cls.tabs}>
                                <button className={cls.tabActive}>Overview</button>
                                <button className={cls.tab}>Characters</button>
                                <button className={cls.tab}>Staff</button>
                                <button className={cls.tab}>Stats</button>
                                <button className={cls.tab}>Social</button>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

            <main className={cls.content}>
                <div className={cls.layout}>
                    <aside className={cls.sidebar}>
                        <div className={cls.metricCard}><Star /> {data.rank ?? '—'} Highest Rated</div>
                        <div className={cls.metricCard}><Heart /> {data.popularity ?? '—'} Most Popular</div>
                        <ul className={cls.infoList}>
                            <li><strong>Airing: </strong> Ep {data.episodes ?? '—'}</li>
                            <li><strong>Duration: </strong> {data.duration ?? '—'}</li>
                            <li><strong>Source:</strong> {data.source ?? '—'}</li>
                            <li><strong>Season / Year:</strong> {data.season ?? '—'} {data.year ?? ''}</li>
                            <li><strong>Aired:</strong> {formatDate(data.aired?.from)} — {formatDate(data.aired?.to)}</li>
                            <li><strong>Broadcast:</strong> {data.broadcast?.string ?? '—'}</li>
                            <li><strong>Rating:</strong> {data.rating ?? '—'}</li>
                            <li><strong>Genres:</strong> {joinNames(data.genres)}</li>
                            <li><strong>Studios:</strong> {joinNames(data.studios)}</li>
                            <li><strong>Producers:</strong> {joinNames(data.producers)}</li>
                            <li><strong>Themes:</strong> {joinNames(data.themes)}</li>
                            <li><strong>Demographics:</strong> {joinNames(data.demographics)}</li>
                        </ul>
                    </aside>

                    <div className={cls.mainColumn}>
                        <section className={cls.section}>
                            <h3 style={{ color: '#fff', marginBottom: 12 }}>Pictures</h3>

                            {pictures && pictures.length > 0 ? (
                                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                    {pictures.map((pic, idx) => {
                                        const url =
                                            typeof pic === 'string'
                                                ? pic
                                                : pic?.jpg?.image_url ||
                                                pic?.image_url ||
                                                pic?.jpg?.large_image_url ||
                                                pic?.webp?.image_url ||
                                                pic?.large_image_url ||
                                                '';

                                        const caption = (pic && (pic.title || pic.caption || pic?.meta || '')) || '';

                                        return (
                                            <div key={pic?.id ?? pic?.image_url ?? url ?? idx} style={{ width: 200 }}>
                                                {url ? (
                                                    <img
                                                        src={url}
                                                        alt={caption || `picture-${idx}`}
                                                        style={{
                                                            width: '100%',
                                                            height: 120,
                                                            objectFit: 'cover',
                                                            borderRadius: 8,
                                                            border: '1px solid rgba(255,255,255,0.03)'
                                                        }}
                                                    />
                                                ) : (
                                                    <div style={{
                                                        width: '100%',
                                                        height: 120,
                                                        borderRadius: 8,
                                                        background: 'rgba(255,255,255,0.02)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: 'rgba(255,255,255,0.6)'
                                                    }}>
                                                        No preview
                                                    </div>
                                                )}
                                                {caption ? <div style={{ color: 'rgba(255,255,255,0.75)', marginTop: 8, fontSize: 13 }}>{caption}</div> : null}
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div style={{ color: 'rgba(255,255,255,0.7)' }}>
                                    No pictures available. <br />
                                    <pre style={{ color: 'rgba(255,255,255,0.5)', whiteSpace: 'pre-wrap', marginTop: 8 }}>
                    {JSON.stringify(picturesData, null, 2)}
                  </pre>
                                </div>
                            )}
                        </section>

                        {data.relations && data.relations.length > 0 && (
                            <div>
                                <h3 style={{ color: '#fff', marginBottom: 12 }}>Relations</h3>
                                <div className={cls.relationsRow}>
                                    {data.relations.map((rel) =>
                                        rel.entry.map((e: any) => (
                                            <div className={cls.relationCard} key={e.mal_id}>
                                                {/* e.image_url может отсутствовать — используем poster как fallback */}
                                                <img className={cls.relThumb} src={e.image_url || poster} alt={e.name} />
                                                <div>
                                                    <div style={{ fontWeight: 700 }}>{e.name}</div>
                                                    <div style={{ color: 'rgba(255,255,255,0.7)' }}>{rel.relation} • {e.type}</div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}

                        <div>
                            <h3 style={{ color: '#fff', marginBottom: 12 }}>Characters</h3>
                            <div className={cls.charactersGrid}>
                                {/* сюда можно вывести data.characters если есть */}
                            </div>
                        </div>

                        <div>
                            <h3 style={{ color: '#fff', marginBottom: 12 }}>Recomendation</h3>
                            <div className={cls.charactersGrid}>
                                {/* сюда можно вывести data.characters если есть */}
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <footer className={cls.footer}>{isFetching ? <small>Обновление...</small> : null}</footer>
        </div>
    );
};

export default AnimeDetailPage;
