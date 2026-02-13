import { type Movie } from "../types/Movie"
import { Link } from "react-router-dom";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link to={`/movie/${encodeURIComponent(movie.detailPath)}`} className="block w-full h-full">
      <div className="group relative w-full h-full cursor-pointer">
        {/* Image Container */}
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-[#1f1f1f] shadow-lg ring-1 ring-white/10 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-indigo-500/20 group-hover:ring-white/30">
          <img
            src={movie.poster}
            alt={movie.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-lg bg-black/60 px-2 py-1 text-xs font-bold text-yellow-400 backdrop-blur-md border border-white/10 shadow-sm">
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
            {movie.rating}
          </div>

          {/* Play Icon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
             <div className="flex h-10 w-14 items-center justify-center rounded-xl bg-red-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
             </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-3 space-y-1 px-1">
          <h3 className="truncate text-base font-bold text-white transition-colors group-hover:text-indigo-400">{movie.title}</h3>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
             <span>{movie.year || 'N/A'}</span>
             <span className="h-1 w-1 rounded-full bg-gray-600"></span>
             <span className="truncate max-w-[120px]">{movie.genre || movie.category || 'Movie'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
