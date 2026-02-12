
interface Episode {
    title?: string;
    playerUrl?: string;
    video_url?: string;
}

interface Season {
    season: number;
    episodes: Episode[];
}

interface Movie {
    seasons?: Season[];
    episodes?: Episode[];
}

interface EpisodesProps {
    movie: Movie;
    currentVideoUrl: string | null;
    setCurrentVideoUrl: (url: string | null) => void;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    activeSeason: number;
    setActiveSeason: (season: number) => void;
}

export default function Episodes({ movie, currentVideoUrl, setCurrentVideoUrl, setIsPlaying, activeSeason, setActiveSeason }: EpisodesProps) {
    const episodes = (movie.seasons?.length ?? 0) > 0 
        ? movie.seasons?.find(s => s.season === activeSeason)?.episodes || []
        : movie.episodes || [];

    if (!episodes.length) return null;

    return (
        <div className="container mx-auto px-6 md:px-12 lg:px-20 -mt-10 mb-16 bg-[#121212] rounded-3xl p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Episodes</h2>
                {(movie.seasons?.length ?? 0) > 1 && (
                    <select value={activeSeason} onChange={e => setActiveSeason(Number(e.target.value))} className="bg-[#1A1A1A] text-white rounded-lg px-3 py-2">
                        {movie.seasons?.map(s => <option key={s.season} value={s.season}>Season {s.season}</option>)}
                    </select>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {episodes.map((ep, idx) => {
                    const url = ep.playerUrl || ep.video_url || null;
                    const isSelected = currentVideoUrl === url;
                    return (
                        <button key={idx} onClick={() => { setCurrentVideoUrl(url); setIsPlaying(true); window.scrollTo({top:0,behavior:'smooth'}); }} className={`p-4 rounded-xl text-left border ${isSelected ? "bg-indigo-600/10 border-indigo-500/50":"bg-[#1A1A1A] hover:bg-[#222]"}`}>
                            <div>{ep.title || `Episode ${idx+1}`}</div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
