
import type { Movie } from "../types/Movie";

export interface ApiResponse<T> {
  success: boolean;
  category?: string;
  items: T[];
  total?: number;
  page?: number;
  hasMore?: boolean;
}

const BASE_URL = 'https://zeldvorik.ru/apiv3/api.php';

type FetchParams = Record<string, string | number>;

const fetchFromApi = async <T>(params: FetchParams): Promise<ApiResponse<T>> => {
  try {
    const url = new URL(BASE_URL);
    Object.keys(params).forEach(key => url.searchParams.append(key, String(params[key])));

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data: ApiResponse<T> = await response.json();
    return data;
  } catch (error: unknown) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const api = {
  getTrending: (page = 1) => fetchFromApi<Movie>({ action: 'trending', page }),
  getIndonesianMovies: (page = 1) => fetchFromApi<Movie>({ action: 'indonesian-movies', page }),
  getIndonesianDrama: (page = 1) => fetchFromApi<Movie>({ action: 'indonesian-drama', page }),
  getKDrama: (page = 1) => fetchFromApi<Movie>({ action: 'kdrama', page }),
  getShortTV: (page = 1) => fetchFromApi<Movie>({ action: 'short-tv', page }),
  getAnime: (page = 1) => fetchFromApi<Movie>({ action: 'anime', page }),
  getAdultComedy: (page = 1) => fetchFromApi<Movie>({ action: 'adult-comedy', page }),
  getWesternTV: (page = 1) => fetchFromApi<Movie>({ action: 'western-tv', page }),
  getIndoDub: (page = 1) => fetchFromApi<Movie>({ action: 'indo-dub', page }),
  search: (keyword: string) => fetchFromApi<Movie>({ action: 'search', q: keyword }),
  getDetail: (detailPath: string) => fetchFromApi<Movie>({ action: 'detail', detailPath }),
};
