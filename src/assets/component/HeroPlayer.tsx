import type { Movie } from "../types/Movie";
import { decodeProxyUrl } from "../utils/decodeProxyUrl";
import { useEffect, useRef } from "react";
import Artplayer from "artplayer";

interface HeroPlayerProps {
  movie: Movie;
  currentVideoUrl: string | null;
  setCurrentVideoUrl: (url: string | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

export default function HeroPlayer({
  movie,
  currentVideoUrl,
  isPlaying,
  setIsPlaying,
}: HeroPlayerProps) {
  const decodedVideoUrl = currentVideoUrl ? decodeProxyUrl(currentVideoUrl) : null;
  const isIframe = decodedVideoUrl && !decodedVideoUrl.endsWith(".mp4") && !decodedVideoUrl.endsWith(".m3u8");
  const isHls = decodedVideoUrl?.endsWith(".m3u8");

  const artplayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let art: Artplayer | null = null;

    if (isHls && artplayerRef.current && decodedVideoUrl) {
      art = new Artplayer({
        container: artplayerRef.current,
        url: decodedVideoUrl,
        autoplay: true,
      });
    }

    return () => {
      art?.destroy();
    };
  }, [decodedVideoUrl, isHls]);

  return (
    <div className="relative w-full aspect-video overflow-hidden bg-black rounded-3xl shadow-lg border border-white/10">
      {!isPlaying && decodedVideoUrl ? (
        <div className="w-full h-full flex items-center justify-center relative">
          {isHls ? (
            <div ref={artplayerRef} className="w-full h-full" />
          ) : isIframe ? (
            <iframe
              src={decodedVideoUrl}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
              title={movie.title}
            />
          ) : (
            <video
              className="w-full h-full object-contain"
              controls
              autoPlay
              preload="metadata"
            >
              <source src={decodedVideoUrl} type="video/mp4" />
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
            src={movie.poster ? decodeProxyUrl(movie.poster) : movie.thumbnail || '/images/default.png'}
            className="w-full h-full object-cover opacity-60 absolute inset-0"
            alt={movie.title || movie.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-10">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">{movie.title || movie.name}</h1>
            {(movie.description) && (
              <p className="max-w-2xl text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed line-clamp-3 md:line-clamp-4">
                {movie.description}
              </p>
            )}

            {decodedVideoUrl ? (
              <button
                onClick={() => setIsPlaying(false)}
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