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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);


  useEffect(() => {
    setMovies([]);
    setCurrentPage(1);
    setHasMore(false);
  }, [slug]);


  useEffect(() => {
    if (!slug) return;

    const fetchCategory = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.getCategory(slug, currentPage);
        const newItems = res.items || [];

        if (currentPage === 1) {
          setMovies(newItems);
        } else {
          setMovies((prev) => [...prev, ...newItems]);
        }
        setHasMore (res.hasMore || false);
      } catch {
        setError("Failed to load category");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug, currentPage]);




  // Format title
  const title = slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "Category";


  return (
    <Authenticated>
      <Head title={title} />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 pt-24 pb-20">
        <h1 className="text-3xl font-bold text-white mb-8 border-l-4 border-indigo-600 pl-4">
          {title}
        </h1>

        {loading && movies.length === 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="bg-[#1A1A1A] rounded-xl h-[300px] animate-pulse"
              ></div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center py-10">{error}</div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="text-gray-400 text-center py-20">
            No movies found in this category.
          </div>
        )}

        {movies.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {hasMore && (
              <div className="flex gap-2 mt-6 justify-center items-center flex-wrap">
                {/* Prev Button */}
                <button
                  disabled={loading}
                  onClick={() =>
                    setCurrentPage((prev) =>
                      prev + 1
                    )
                  }
                  className="px-6 py-2 rounded-full bg-red-600 text-white hover:bg-red-400 transition-colors disabled:opacity-50"
                >
                  {loading ? "Loading..." : "Load More"}
                </button>



                {/* Next Button */}
                
              </div>
            )}
          </>
        )}
      </div>
    </Authenticated>
  );
}
