import { type Movie } from "../types/Movie"
import { Link } from "react-router-dom";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link to={`/movie/${encodeURIComponent(movie.detailPath)}`}>
      <div className="group cursor-pointer">
        <img
          src={movie.poster}
          className="rounded-lg w-full h-[300px] object-cover group-hover:scale-105 transition"
        />
        <h3 className="text-white mt-2">{movie.title}</h3>
      </div>
    </Link>
  );
}
