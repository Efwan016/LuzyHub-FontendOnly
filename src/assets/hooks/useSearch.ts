import { useState } from "react";
import { api } from "../services/api";
import { type Movie } from "../types/Movie";

type UseSearchReturn = {
  results: Movie[];
  loading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
};

export function useSearch(): UseSearchReturn {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const res = await api.search(query);
      setResults(res.items || []);
    } catch {
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, search };
}
