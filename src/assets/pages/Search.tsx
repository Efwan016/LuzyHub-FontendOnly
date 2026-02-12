import { useState, type FormEvent } from "react";
import { api } from "../services/api";
import { type Movie } from "../types/Movie";
import MovieCard from "../component/MovieCard";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    const res = await api.search(query);
    setResults(res.items || []);
  };

  return (
    <div className="bg-black min-h-screen p-10 text-white">
      <form onSubmit={handleSearch}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-4 bg-zinc-900 rounded"
          placeholder="Search movies..."
        />
      </form>

      <div className="grid grid-cols-5 gap-4 mt-10">
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
