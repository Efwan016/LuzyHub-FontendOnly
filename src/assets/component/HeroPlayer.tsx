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

  const isVideoFile =
    decodedVideoUrl?.includes(".mp4") ||
    decodedVideoUrl?.includes(".m3u8");

  const isIframe = !isVideoFile;

  const isHls = decodedVideoUrl?.endsWith(".m3u8");

  const artplayerRef = useRef<HTMLDivElement>(null);



  // 🔥 INIT CAST
  useEffect(() => {
    const initCast = () => {
      const context = window.cast.framework.CastContext.getInstance();
      context.setOptions({
        receiverApplicationId:
          window.chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
        autoJoinPolicy:
          window.chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
      });
    };

    if (window.cast && window.cast.framework) {
      initCast();
    } else {
      window.__onGCastApiAvailable = (isAvailable: boolean) => {
        if (isAvailable) initCast();
      };
    }
  }, []);

  // 🔥 ARTPLAYER (HLS)
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

  // 🔥 CAST FUNCTION
  const startCasting = async () => {
    try {
      if (!window.chrome || !window.chrome.cast) {
        alert("Device tidak support cast");
        return;
      }

      if (!decodedVideoUrl) {
        alert("Video tidak tersedia");
        return;
      }

      if (isIframe) {
        alert("Video iframe tidak bisa di cast");
        return;
      }

      const context =
        window.cast.framework.CastContext.getInstance();

      const session = await context.requestSession();

      const mediaInfo = new window.chrome.cast.media.MediaInfo(
        decodedVideoUrl,
        isHls ? "application/x-mpegURL" : "video/mp4"
      );

      const request =
        new window.chrome.cast.media.LoadRequest(mediaInfo);

      await session.loadMedia(request);
    } catch (err) {
      console.error("Cast error:", err);
    }

  };

  return (
    <div className="relative w-full aspect-video overflow-hidden bg-black rounded-3xl shadow-lg border border-white/10">

      {!isPlaying && decodedVideoUrl ? (
        <div className="w-full h-full flex items-center justify-center relative">

          {/* PLAYER */}
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
            </video>
          )}

          {/* ❌ CLOSE */}
          <button
            onClick={() => setIsPlaying(false)}
            className="absolute top-6 right-6 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full z-50"
          >
            ✕
          </button>

          {/* 📺 CAST BUTTON */}
          {!isIframe && (
            <button
              onClick={startCasting}
              className="absolute top-6 right-20 bg-black/50 hover:bg-black/80 text-white px-3 py-2 rounded-xl z-50"
            >
              📺 Cast
            </button>
          )}
        </div>

      ) : (
        <>
          {/* BACKGROUND */}
          <img
            src={
              movie.poster
                ? decodeProxyUrl(movie.poster)
                : movie.thumbnail || "/images/default.png"
            }
            className="w-full h-full object-cover opacity-60 absolute inset-0"
            alt={movie.title || movie.name}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent" />

          {/* CONTENT */}
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {movie.title || movie.name}
            </h1>

            {movie.description && (
              <p className="max-w-2xl text-gray-300 text-sm md:text-base line-clamp-3">
                {movie.description}
              </p>
            )}

            {decodedVideoUrl ? (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setIsPlaying(false)}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold"
                >
                  ▶ Watch Now
                </button>

                {!isIframe && (
                  <button
                    onClick={startCasting}
                    className="px-4 py-3 bg-black/50 hover:bg-black/80 text-white rounded-xl"
                  >
                    📺 Cast
                  </button>
                )}
              </div>
            ) : (
              <div className="mt-4 px-6 py-3 bg-gray-800 text-gray-400 rounded-xl">
                Video Not Available
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}