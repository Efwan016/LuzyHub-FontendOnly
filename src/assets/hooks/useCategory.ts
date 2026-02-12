import { useEffect, useState } from "react";
import { api } from "../services/api";
import { type Movie } from "../types/Movie";

type UseCategoryReturn = {
  data: Movie[];
  loading: boolean;
  error: string | null;
};

export function useCategory(category: string): UseCategoryReturn {
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category) return;

    let mounted = true;

    async function fetchCategory() {
      try {
        const res = await api.getCategory(category);
        if (mounted) {
          setData(res.items || []);
        }
      } catch {
        if (mounted) {
          setError("Failed to fetch category");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchCategory();

    return () => {
      mounted = false;
    };
  }, [category]);

  return { data, loading, error };
}
