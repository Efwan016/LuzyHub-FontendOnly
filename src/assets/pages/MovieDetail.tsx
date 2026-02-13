import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api"; 
import HeroPlayer from "../component/HeroPlayer";
import Episodes from "../component/Episodes";
import Recommendations from "../component/Recomendations";
import type { Movie } from "../types/Movie";
import Head from "../component/Head";
import Authenticated from "../layout/Autenticated";

export default function MovieDetail() {
  const { slug } = useParams(); // ambil detailPath dari URL
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);
  const [activeSeason, setActiveSeason] = useState(1);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Helper untuk ambil video pertama yang bisa diputar
 const getFirstPlayableVideo = (movie: Movie) => {
  // cek seasons
  if (movie.seasons && movie.seasons.length > 0) {
    const firstSeason = movie.seasons[0];
    if (firstSeason.episodes && firstSeason.episodes.length > 0) {
      const firstEp = firstSeason.episodes[0];
      if (firstEp.playerUrl) return firstEp.playerUrl;
    }
  }

  // fallback ke trailer
  if (movie.trailerUrl) return movie.trailerUrl;

  // fallback ke playerUrl / video_url
  if (movie.playerUrl) return movie.playerUrl;
  if (movie.video_url) return movie.video_url;

  return null;
};

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Ambil detail movie
        const res = await api.getDetail(slug);
        const data = res.data ?? null;

        if (!data) {
          setError("Movie Not Found");
          setMovie(null);
          return;
        }

        setMovie(data);

        // Pilih video pertama
        const videoUrl = getFirstPlayableVideo(data);
        setCurrentVideoUrl(videoUrl);
        setIsPlaying(!!videoUrl);

        // Ambil recommendations (trending)
        const trending = await api.getTrending();
        const recs = trending?.items?.slice(0, 5) || [];
        setRecommendations(recs);
      } catch (err) {
        console.error(err);
        setError("Movie Not Found");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <div className="text-white p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!movie) return <div className="text-white p-4">Movie not found</div>;

  return (
     <Authenticated>
            <Head title={movie.title || movie.name || "No Title"} />
    <div className="bg-black text-white min-h-screen pb-20">
      <HeroPlayer
        movie={movie}
        currentVideoUrl={currentVideoUrl}
        setCurrentVideoUrl={setCurrentVideoUrl}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />

      <Episodes
        movie={movie}
        currentVideoUrl={currentVideoUrl}
        setCurrentVideoUrl={(url) => {
          setCurrentVideoUrl(url);
          setIsPlaying(true);
        }}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        activeSeason={activeSeason}
        setActiveSeason={setActiveSeason}
      />

      <Recommendations recommendations={recommendations} />
    </div>
     </Authenticated>
  );
}
