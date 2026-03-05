import type { Movie } from "../types/Movie";
import CircularGallery from "../layout/style/CircularGalery";
import { useNavigate } from "react-router-dom";


interface RecommendationsProps {
    recommendations: Movie[];
}

export default function Recommendations({ recommendations }: RecommendationsProps) {
    const navigate = useNavigate();
    if (!recommendations || recommendations.length === 0) return null;

    const items = recommendations.map((movie) => ({
        image: movie.poster,
        text: movie.title || "",
    }));

    const handleItemClick = (index: number) => {
        const movie = recommendations[index];
        if (movie) {
            navigate(`/movie/${encodeURIComponent(movie.detailPath)}`);
        }
    };

    return (
        <div className="container mx-auto px-6 md:px-12 lg:px-20 space-y-8 mt-20 mb-20">
            <h2 className="text-2xl font-bold text-white">You May Also Like</h2>
            <div className="w-full h-[600px]">
                <CircularGallery items={items} bend={1} textColor="#ffffff" borderRadius={0.05} scrollSpeed={2} scrollEase={0.05} onItemClick={handleItemClick} />
            </div>
        </div>
    )
}