import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { type Movie, type ApiResponse } from "../types/Movie";

export default function MovieDetail() {
  const { path } = useParams<{ path: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!path) return;

    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res: ApiResponse<Movie> = await api.getDetail(path);

        if (res.success && res.items.length > 0) {
          setMovie(res.items[0]); // <-- ambil movie pertama
        } else {
          setError("Movie not found");
        }
      } catch (err: unknown) {
        setError((err as Error).message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [path]);

  if (loading) return <div className="text-white p-10">Loading...</div>;
  if (error) return <div className="text-red-500 p-10">{error}</div>;
  if (!movie) return <div className="text-white p-10">Movie not found</div>;

  return (
    <div className="bg-black min-h-screen text-white p-10">
      <h1 className="text-4xl font-bold">{movie.title}</h1>
      <img src={movie.poster} className="my-6 w-[300px]" />
      <p>{movie.description}</p>
    </div>
  );
}
