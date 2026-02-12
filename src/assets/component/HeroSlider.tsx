import { useEffect, useState } from "react";
import { type Movie } from "../types/Movie";

export default function HeroSlider({ movies }: { movies: Movie[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!movies.length) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [movies]);

  if (!movies.length) return null;

  const movie = movies[index];

  return (
    <div
      className="h-[60vh] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${movie.poster})` }}
    >
      <div className="absolute inset-0 bg-black/70 flex items-center px-10">
        <div>
          <h1 className="text-5xl text-white font-bold">{movie.title}</h1>
          <p className="text-gray-300 mt-4 max-w-xl">
            {movie.description}
          </p>
        </div>
      </div>
    </div>
  );
}
