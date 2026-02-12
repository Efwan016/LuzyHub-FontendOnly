import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTrending } from "../hooks/useTrending";
import { api } from "../services/api";
import type { Movie } from "../types/Movie";
import MovieCarousel from "../component/MovieCarousel";
import Authenticated from "../layout/Autenticated";
import Head from "../component/Head";

export default function Home() {
  const { data: movies, loading, error } = useTrending();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [kdrama, setKdrama] = useState<Movie[]>([]);
  const [anime, setAnime] = useState<Movie[]>([]);
  const [indonesiaMovies, setIndonesiaMovies] = useState<Movie[]>([]);



  const featured = useMemo(() => movies.slice(0, 5), [movies]);
  const trendingNow = useMemo(() => movies.slice(5, 15), [movies]);

  useEffect(() => {
    api.getKDrama().then((res) => setKdrama(res.items || [])).catch(console.error);
    api.getAnime().then((res) => setAnime(res.items || [])).catch(console.error);
    api.getIndonesianMovies().then((res) => setIndonesiaMovies(res.items || [])).catch(console.error);
    
  }, []);
  

  useEffect(() => {
    if (!featured.length) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [featured]);

  if (loading)
    return (
      <Authenticated>
        <Head title="Luzy Home" />  
        <div className="-m-4 sm:-m-6 lg:-m-8 min-h-screen bg-[#141414] text-white overflow-x-hidden">
          {/* Hero Skeleton */}
          <div className="relative w-full h-[55vh] sm:h-[65vh] lg:h-[80vh] min-h-[500px] bg-[#1f1f1f] animate-pulse">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full px-4 sm:px-6 lg:px-16 lg:w-1/2 flex flex-col justify-end h-full pb-20 lg:justify-center lg:pb-0 pt-20 space-y-6">
                <div className="h-12 sm:h-16 lg:h-20 w-3/4 bg-[#2f2f2f] rounded" />
                <div className="flex gap-4">
                  <div className="h-6 w-20 bg-[#2f2f2f] rounded" />
                  <div className="h-6 w-16 bg-[#2f2f2f] rounded" />
                  <div className="h-6 w-12 bg-[#2f2f2f] rounded" />
                </div>
                <div className="h-24 w-full bg-[#2f2f2f] rounded" />
                <div className="flex gap-3">
                  <div className="h-12 w-32 bg-[#2f2f2f] rounded" />
                  <div className="h-12 w-32 bg-[#2f2f2f] rounded" />
                </div>gi
              </div>
            </div>
          </div>

          {/* Movie Rows Skeleton */}
          <div className="relative z-20 -mt-4 lg:-mt-10 space-y-10 pb-10">
            {[1, 2].map((i) => (
              <div key={i}>
                <div className="h-8 w-48 bg-[#1f1f1f] rounded mb-4 animate-pulse" />
                <div className="flex gap-4 overflow-hidden">
                  {[1, 2, 3, 4, 5, 6].map((j) => (
                    <div key={j} className="w-48 flex-shrink-0">
                      <div className="h-[300px] bg-[#1f1f1f] rounded-lg animate-pulse" />
                      <div className="mt-2 h-4 w-3/4 bg-[#1f1f1f] rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Authenticated>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-[#141414] text-white text-xl">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );

  return (
    <Authenticated>
      {/* Negative margins to break out of the Authenticated layout padding for full-width effect */}
      <div className="-m-4 sm:-m-6 lg:-m-8 min-h-screen bg-[#141414] text-white overflow-x-hidden">
        <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
        {/* Featured Slider */}
        {featured.length > 0 && (
          <div className="relative w-full h-[55vh] sm:h-[65vh] lg:h-[80vh] min-h-[500px] overflow-hidden group">
            {featured.map((movie, idx) => (
              <div
                key={movie.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIndex ? "opacity-100 z-10" : "opacity-0"
                  }`}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${movie.poster})` }}
                >
                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#141414]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/80 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full px-4 sm:px-6 lg:px-16 lg:w-1/2 flex flex-col justify-end h-full pb-20 lg:justify-center lg:pb-0 pt-20">
                    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-4 tracking-tight drop-shadow-lg">
                      {movie.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm sm:text-base font-medium text-gray-200 mb-6">
                      <span className="text-[#46d369]">{(Number(movie.rating) * 10).toFixed(0)}% Match</span>
                      <span>{movie.year ?? "2024"}</span>
                      <span className="border border-gray-500 px-1 rounded text-xs">HD</span>
                      <span>{movie.genre ?? movie.category ?? "Movie"}</span>
                    </div>
                    {movie.description && (
                      <p className="text-gray-300 text-sm sm:text-base mb-6 max-w-lg line-clamp-3 drop-shadow-md">
                        {movie.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/movie/${encodeURIComponent(movie.detailPath)}`}
                        className="flex items-center gap-2 bg-white text-black hover:bg-white/90 px-6 py-2.5 rounded font-bold transition-colors text-lg"
                      >
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        Play
                      </Link>
                      <button className="flex items-center gap-2 bg-[#6d6d6eb3] text-white hover:bg-[#6d6d6e66] px-6 py-2.5 rounded font-bold transition-colors text-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        More Info
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Slider Controls (Arrows + Dots) */}
            <div className="absolute bottom-24 right-4 lg:bottom-20 lg:right-16 z-30 flex justify-center items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentIndex(
                      (currentIndex - 1 + featured.length) % featured.length
                    )
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/60 transition-all border border-white/20 backdrop-blur-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                  onClick={() =>
                    setCurrentIndex((currentIndex + 1) % featured.length)
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/60 transition-all border border-white/20 backdrop-blur-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>

              <div className="flex space-x-2">
                {featured.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${idx === currentIndex
                      ? "bg-white w-6"
                      : "bg-white/50 hover:bg-white/80"
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Movie Rows - Overlapping the hero slightly */}
        <div className="relative z-20 -mt-4 lg:-mt-10 space-y-10 pb-10">
          <MovieCarousel title="Trending Now" movies={trendingNow} />
          <MovieCarousel title="K-Drama" movies={kdrama} seeAllLink="/category/kdrama" />
          <MovieCarousel title="Anime" movies={anime} seeAllLink="/category/anime" />
          <MovieCarousel title="Indonesian Movies" movies={indonesiaMovies} seeAllLink="/category/indonesia-movies" />
        </div>
      </div>
    </Authenticated>
  );
}
