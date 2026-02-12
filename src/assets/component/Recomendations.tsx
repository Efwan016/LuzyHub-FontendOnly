
import MovieCard from "./MovieCard";
import type { Movie } from "../types/Movie";

interface RecommendationsProps {
    recommendations: Movie[];
}

export default function Recommendations({ recommendations }: RecommendationsProps) {
    if (!recommendations || recommendations.length === 0) return null;

    return (
        <div className="container mx-auto px-6 md:px-12 lg:px-20 space-y-8 mb-20">
            <h2 className="text-2xl font-bold text-white">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {recommendations.map((item, idx) => (
                    <MovieCard key={idx} movie={item} />
                ))}
            </div>
        </div>
    )
}