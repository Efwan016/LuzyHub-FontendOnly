import { useEffect, useState } from "react";
import axios from "axios";
import { type Movie } from "../types/Movie";

export function useTrending() {
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/trending"); // pake proxy di vite.config.ts
        if (res.data.success) {
          setData(res.data.items);
        } else {
          setError("Failed to fetch trending movies");
        }
      } catch (err: unknown) {
        setError((err as Error).message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return { data, loading, error };
}
