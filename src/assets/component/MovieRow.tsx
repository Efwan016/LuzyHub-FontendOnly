import { type Movie } from "../types/Movie";
import MovieCard from "./MovieCard";

export default function MovieRow({
  title,
  movies,
}: {
  title: string;
  movies: Movie[];
}) {
  return (
    <div className="mb-10">
      <h2 className="text-white text-xl mb-4">{title}</h2>

      <div className="flex gap-4 overflow-x-auto">
        {movies.map((movie) => (
          <div key={movie.id} className="min-w-[200px]">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
