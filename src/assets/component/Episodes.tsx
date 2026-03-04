import { useMemo } from "react";
import { motion } from "framer-motion";

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
    const episodes = useMemo(() => (movie.seasons?.length ?? 0) > 0
        ? movie.seasons?.find(s => s.season === activeSeason)?.episodes || []
        : movie.episodes || [], [movie, activeSeason]);

    if (!episodes.length) return null;

    const handleEpisodeClick = (episode: Episode) => {
        const url = episode.playerUrl || episode.video_url || null;
        if (url) {
            setCurrentVideoUrl(url);
            setIsPlaying(false); // Set to false to show the player
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 -mt-10 mb-16">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                    <h2 className="text-2xl lg:text-3xl font-bold text-white">Episodes</h2>
                    {(movie.seasons?.length ?? 0) > 1 && (
                        <div className="flex-shrink-0 bg-gray-800/50 p-1 rounded-xl flex items-center gap-1 self-start">
                            {movie.seasons?.map(s => (
                                <button
                                    key={s.season}
                                    onClick={() => setActiveSeason(s.season)}
                                    className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors duration-300 ${
                                        activeSeason === s.season
                                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                                            : 'text-gray-300 hover:bg-gray-700/50'
                                    }`}
                                >
                                    Season {s.season}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div className="space-y-3 max-h-[60vh] md:max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800/50">
                    {episodes.map((ep, idx) => {
                        const episodeUrl = ep.playerUrl || ep.video_url;
                        const isActive = episodeUrl === currentVideoUrl;

                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                key={idx}
                                onClick={() => handleEpisodeClick(ep)}
                                className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 border ${
                                    isActive
                                        ? 'bg-indigo-600/20 border-indigo-500'
                                        : 'bg-gray-800/50 border-transparent hover:bg-gray-700/70 hover:border-gray-600'
                                }`}
                            >
                                <span className="text-lg font-bold text-gray-400 w-8 text-center flex-shrink-0">{idx + 1}</span>
                                <div className="flex-1 min-w-0">
                                    <p className={`font-semibold truncate ${isActive ? 'text-white' : 'text-gray-200'}`}>
                                        {ep.title || `Episode ${idx + 1}`}
                                    </p>
                                </div>
                                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-indigo-500' : 'bg-gray-700'}`}>
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
