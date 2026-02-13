import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSearch } from "../hooks/useSearch";
import MovieCard from "../component/MovieCard";
import Head from "../component/Head";
import Authenticated from "../layout/Autenticated";

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("q") || "";

  const { results, loading, error, search } = useSearch();

  const [keyword, setKeyword] = useState(query);

  // Sync input ketika URL berubah
  useEffect(() => {
    setKeyword(query);
  }, [query]);

  // Trigger search ketika query berubah
  useEffect(() => {
    if (query) {
      search(query);
    }
  }, [query, search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = keyword.trim();
    if (!trimmed) return;

    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <Authenticated>
      <Head title={query ? `Search: ${query}` : "Search"} />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 pt-24 pb-20">

        {/* Search Input */}
        <div className="max-w-3xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="relative flex items-center gap-2">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search for movies, TV shows..."
              className="w-full bg-[#605a5a] text-white border border-gray-400 rounded-xl py-4 px-6 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-700 text-white px-8 py-4 rounded-xl font-bold transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 border-l-4 border-indigo-600 pl-4">
          {query ? `Results for "${query}"` : "Search Movies"}
        </h1>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="bg-[#1A1A1A] rounded-xl h-[300px] animate-pulse"
              ></div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-red-500 text-center py-10">
            {error}
          </div>
        )}

        {/* Results */}
        {!loading && !error && (
          <>
            {results.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {results.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              query && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="text-gray-400 text-lg">
                    No results found for "{query}"
                  </p>
                </div>
              )
            )}
          </>
        )}
      </div>
    </Authenticated>
  );
}
