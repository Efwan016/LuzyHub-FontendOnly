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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Reset page when slug changes
  useEffect(() => {
    setCurrentPage(1);
  }, [slug]);

  // Fetch category based on slug + page
  useEffect(() => {
    if (!slug) return;

    const fetchCategory = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.getCategory(slug, currentPage);

        setMovies(res.items || res.data || []);
        setTotalPages(res.totalPages || 1);
      } catch {
        setError("Failed to load category");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug, currentPage]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Format title
  const title = slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "Category";

  // Professional pagination generator
  const getPagination = () => {
    const pages: (number | string)[] = [];
    const start = Math.max(currentPage - 2, 1);
    const end = Math.min(currentPage + 2, totalPages);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

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
              {movies.map((movie, idx) => (
                <MovieCard key={idx} movie={movie} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex gap-2 mt-6 justify-center items-center flex-wrap">
                {/* Prev Button */}
                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="px-3 py-1 rounded bg-gray-700 text-gray-300 disabled:opacity-40"
                >
                  Prev
                </button>

                {getPagination().map((p, i) =>
                  p === "..." ? (
                    <span key={i} className="px-2 text-gray-400">
                      ...
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p as number)}
                      className={`px-3 py-1 rounded ${
                        currentPage === p
                          ? "bg-red-500 text-white"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

                {/* Next Button */}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages)
                    )
                  }
                  className="px-3 py-1 rounded bg-gray-700 text-gray-300 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Authenticated>
  );
}
