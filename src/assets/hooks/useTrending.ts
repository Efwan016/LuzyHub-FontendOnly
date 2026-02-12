// src/hooks/useTrending.ts
import { useEffect, useState } from "react";
import { api } from "../services/api"; // path ke api.ts
import type { Movie } from "../types/Movie";

export function useTrending() {
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const res = await api.getTrending(); // langsung panggil helper

        if (res.success) {
          setData(res.items);
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
