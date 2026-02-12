
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import type { Movie } from "../types/Movie";
import MovieCard from "../component/MovieCard";
import Head from "../component/Head";
import Authenticated from "../layout/Autenticated";

export default function Category() {
  const { slug } = useParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (!slug) return;

    setMovies([]);
    setPage(1);
    setHasMore(false);

    const fetchCategory = async () => {
      try {
        setLoading(true);
        // Menggunakan slug dari URL sebagai parameter action API
        const res = await api.getCategory(slug, 1);
        setMovies(res.items || []);
        setHasMore(res.hasMore || false);
      } catch {
        setError("Failed to load category");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug]);

  const loadMore = async () => {
    if (!slug) return;
    const nextPage = page + 1;
    try {
      setLoadingMore(true);
      const res = await api.getCategory(slug, nextPage);
      setMovies((prev) => [...prev, ...(res.items || [])]);
      setHasMore(res.hasMore || false);
      setPage(nextPage);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  };

  // Format judul: "kdrama" -> "Kdrama" (atau bisa disesuaikan lebih lanjut)
  const title = slug ? slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) : "Category";

  return (
    <Authenticated>
      <Head title={title} />
      <div className="container mx-auto px-6 md:px-12 lg:px-20 pt-24 pb-20">
        <h1 className="text-3xl font-bold text-white mb-8 border-l-4 border-indigo-600 pl-4">{title}</h1>
        {loading && movies.length === 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-[#1A1A1A] rounded-xl h-[300px] animate-pulse"></div>
            ))}
          </div>
        )}

        {error && <div className="text-red-500 text-center py-10">{error}</div>}

        {!loading && !error && movies.length === 0 && (
          <div className="text-gray-400 text-center py-20">No movies found in this category.</div>
        )}

        {movies.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
              {movies.map((movie, idx) => (
                <MovieCard key={idx} movie={movie} />
              ))}
            </div>
            
            {hasMore && (
              <div className="flex justify-center">
                <button 
                  onClick={loadMore} 
                  disabled={loadingMore}
                  className="bg-[#1A1A1A] hover:bg-[#252525] text-white px-8 py-3 rounded-full font-semibold transition-colors border border-white/10 disabled:opacity-50"
                >
                  {loadingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Authenticated>
  );
}
