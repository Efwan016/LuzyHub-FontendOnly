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
  const [indonesianDrama, setIndonesianDrama] = useState<Movie[]>([]);
  const [indoDub, setIndoDub] = useState<Movie[]>([]);
  const [shortTv, setShortTv] = useState<Movie[]>([]);
  const [westernTv, setWesternTv] = useState<Movie[]>([]);
  const [adultComedy, setAdultComedy] = useState<Movie[]>([]);




  const featured = useMemo(() => movies.slice(0, 5), [movies]);
  const trendingNow = useMemo(() => movies.slice(5, 15), [movies]);

  useEffect(() => {
    api.getKDrama().then((res) => setKdrama(res.items || [])).catch(console.error);
    api.getAnime().then((res) => setAnime(res.items || [])).catch(console.error);
    api.getIndonesianMovies().then((res) => setIndonesiaMovies(res.items || [])).catch(console.error);
    api.getShortTV().then((res) => setShortTv(res.items || [])).catch(console.error);
    api.getIndonesianDrama().then((res) => setIndonesianDrama(res.items || [])).catch(console.error);
    api.getWesternTV().then((res) => setWesternTv(res.items || [])).catch(console.error);
    api.getIndoDub().then((res) => setIndoDub(res.items || [])).catch(console.error);
    api.getAdultComedy().then((res) => setAdultComedy(res.items || [])).catch(console.error);
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
        <div className="-m-4 sm:-m-6 lg:-m-8 min-h-screen bg-[#141414] text-white overflow-x-hidden pb-20">
          {/* Hero Skeleton */}
          <div className="relative w-full h-[85vh] bg-[#0a0a0a] animate-pulse">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full px-4 sm:px-8 lg:px-16 lg:w-1/2 flex flex-col justify-end h-full pb-32 lg:justify-center lg:pb-0 pt-20 space-y-8">
                <div className="h-12 sm:h-16 lg:h-24 w-3/4 bg-[#1f1f1f] rounded-lg" />
                <div className="flex gap-4">
                  <div className="h-6 w-20 bg-[#1f1f1f] rounded" />
                  <div className="h-6 w-16 bg-[#1f1f1f] rounded" />
                  <div className="h-6 w-12 bg-[#1f1f1f] rounded" />
                </div>
                <div className="h-24 w-full bg-[#1f1f1f] rounded-lg" />
                <div className="flex gap-4">
                  <div className="h-14 w-40 bg-[#1f1f1f] rounded-lg" />
                  <div className="h-14 w-40 bg-[#1f1f1f] rounded-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Movie Rows Skeleton */}
          <div className="relative z-20 -mt-32 space-y-12 px-4 sm:px-8">
            {[1, 2].map((i) => (
              <div key={i}>
                <div className="h-8 w-48 bg-[#1f1f1f] rounded mb-6 animate-pulse" />
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
      <div className="-m-4 sm:-m-6 lg:-m-8 min-h-screen bg-[#141414] text-white overflow-x-hidden pb-20">
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
          <div className="relative w-full h-[85vh] min-h-[600px] overflow-hidden group">
            {featured.map((movie, idx) => (
              <div
                key={movie.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 overflow-hidden"
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className={`w-full h-full object-cover transition-transform duration-[20s] ease-linear ${idx === currentIndex ? "scale-110" : "scale-100"}`}
                  />
                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-[#141414]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex items-center px-4 sm:px-8 lg:px-16">
                  <div className="w-full lg:w-2/3 xl:w-1/2 flex flex-col justify-end h-full pb-32 lg:justify-center lg:pb-0 pt-20 space-y-6">
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter leading-none drop-shadow-2xl text-white">
                      {movie.title}
                    </h1>
                    <div className="flex items-center flex-wrap gap-4 text-sm sm:text-base font-medium text-gray-200">
                      <span className="flex items-center gap-1 text-yellow-400 font-bold">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                        {movie.rating}
                      </span>
                      <span className="text-gray-300">{movie.year ?? "2024"}</span>
                      <span className="border border-white/30 bg-white/10 px-2 py-0.5 rounded text-xs backdrop-blur-sm">HD</span>
                      <span className="flex items-center gap-2 text-gray-300">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        {movie.genre ?? movie.category ?? "Movie"}
                      </span>
                    </div>
                    {movie.description && (
                      <p className="text-gray-300 text-base sm:text-lg max-w-2xl line-clamp-3 drop-shadow-md leading-relaxed">
                        {movie.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 pt-4">
                      <Link
                        to={`/movie/${encodeURIComponent(movie.detailPath)}`}
                        className="flex items-center gap-3 bg-red-600  text-white hover:bg-red-400 px-8 py-3.5 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
                      >
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        Play Now
                      </Link>
                      <Link
                        to={`/movie/${encodeURIComponent(movie.detailPath)}`}
                        className="flex items-center gap-3 bg-gray-600/40 backdrop-blur-md text-white hover:bg-white hover:text-black px-8 py-3.5 rounded-xl font-bold transition-all border border-white/10 shadow-lg"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        More Info
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Slider Controls (Arrows + Dots) */}
            <div className="absolute bottom-10 right-4 lg:bottom-20 lg:right-16 z-30 flex flex-col-reverse lg:flex-row justify-center items-center gap-6">
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentIndex(
                      (currentIndex - 1 + featured.length) % featured.length
                    )
                  }
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 text-white hover:bg-white hover:text-black transition-all border border-white/20 backdrop-blur-md group/btn"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                  onClick={() =>
                    setCurrentIndex((currentIndex + 1) % featured.length)
                  }
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 text-white hover:bg-white hover:text-black transition-all border border-white/20 backdrop-blur-md group/btn"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>

              <div className="flex space-x-2">
                {featured.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex
                      ? "bg-white w-8"
                      : "bg-white/30 w-4 hover:bg-white/60"
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Movie Rows - Overlapping the hero slightly */}
        <div className="relative z-20 -mt-24 lg:-mt-32 space-y-12 px-4 sm:px-8 bg-gradient-to-b from-transparent via-[#141414] to-[#141414] pt-10">
          <MovieCarousel title="Trending Now" movies={trendingNow} />
          <MovieCarousel title="K-Drama" movies={kdrama} seeAllLink="/category/kdrama" />
          <MovieCarousel title="Anime" movies={anime} seeAllLink="/category/anime" />
          <MovieCarousel title="Short TV" movies={shortTv} seeAllLink="/category/short-tv" />
          <MovieCarousel title="Indonesian Movies" movies={indonesiaMovies} seeAllLink="/category/indonesian-movies" />
          <MovieCarousel title="Indonesian Drama" movies={indonesianDrama} seeAllLink="/category/indonesian-drama" />
          <MovieCarousel title="Western TV" movies={westernTv} seeAllLink="/category/western-tv" />
          <MovieCarousel title="Adult Comedy" movies={adultComedy} seeAllLink="/category/adult-comedy" />
          <MovieCarousel title="Indo Dub" movies={indoDub} seeAllLink="/category/indo-dub" />
        </div>
      </div>
    </Authenticated>
  );
}
