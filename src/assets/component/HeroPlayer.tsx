import type { Movie } from "../types/Movie";

interface HeroPlayerProps {
    movie: Movie;
    currentVideoUrl: string | null;
    setCurrentVideoUrl: (url: string | null) => void;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
}

export default function HeroPlayer({ movie, currentVideoUrl, isPlaying, setIsPlaying }: HeroPlayerProps) {
    // Kalau URL bukan .mp4, kita anggap pakai iframe
    const isIframe = currentVideoUrl && !currentVideoUrl.endsWith(".mp4");

    return (
        <div className="relative w-full aspect-video md:aspect-[21/9] lg:h-[85vh] overflow-hidden bg-black">
            {isPlaying && currentVideoUrl ? (
                <div className="w-full h-full flex items-center justify-center relative">
                    {isIframe ? (
                        <iframe
                            src={currentVideoUrl}
                            className="w-full h-full"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                            title={movie.title}
                        />
                    ) : (
                        <video
                            className="w-full h-full object-contain max-h-[85vh]"
                            controls
                            autoPlay
                        >
                            <source src={currentVideoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}

                    <button
                        onClick={() => setIsPlaying(false)}
                        className="absolute top-6 right-6 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all z-50"
                    >
                        ✕
                    </button>
                </div>
            ) : (
                <>
                    <img
                        src={movie.poster || movie.thumbnail || '/images/default.png'}
                        className="w-full h-full object-cover opacity-60 absolute inset-0"
                        alt={movie.title || movie.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 z-10">
                        <h1 className="text-4xl md:text-6xl font-extrabold">{movie.title || movie.name}</h1>

                        {currentVideoUrl ? (
                            <button
                                onClick={() => setIsPlaying(true)}
                                className="mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
                            >
                                <span>▶</span> Watch Now
                            </button>
                        ) : (
                            <div className="mt-4 px-6 py-3 bg-gray-800 text-gray-400 rounded-xl font-semibold inline-block cursor-not-allowed">
                                Video Not Available
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
