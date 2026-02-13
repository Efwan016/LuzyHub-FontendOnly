import { useState, useCallback } from "react";
import { api } from "../services/api";
import type { Movie } from "../types/Movie";

export function useSearch() {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await api.search(query);
      setResults(res.items ?? []);
    } catch  {
      setError("Failed to search movies");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, error, search };
}
