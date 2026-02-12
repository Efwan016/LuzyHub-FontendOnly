import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { type Movie } from "../types/Movie";

export default function MovieDetail() {
  const { path } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (!path) return;

    api.getDetail(path).then((res) => {
      setMovie(res);
    });
  }, [path]);

  if (!movie) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="bg-black min-h-screen text-white p-10">
      <h1 className="text-4xl font-bold">{movie.title}</h1>
      <img src={movie.poster} className="my-6 w-[300px]" />
      <p>{movie.description}</p>
    </div>
  );
}
