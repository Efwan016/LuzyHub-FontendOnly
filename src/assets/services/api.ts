
import type { Movie, ApiResponse} from "../types/Movie";


const BASE_URL = 'https://foodcash.com.br/sistema/apiv4/api.php';
const SPORTS_BASE_URL = "/sports/v2/";
const SPORTS_API_KEY = "84f79cf576a79338d491889b45198610";
const DRACIN_BASE_URL = "https://api.sansekai.my.id/api/dramabox";

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

const fetchSportsApi = async (params: FetchParams) => {
  try {
    const searchParams = new URLSearchParams(params as Record<string, string>);
    const url = `${SPORTS_BASE_URL}?${searchParams.toString()}`;

    const response = await fetch(url, {
      headers: {
        "X-API-KEY": SPORTS_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`Sports API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Sports API error:", error);
    throw error;
  }
};

const fetchFromDracinApi = async (path: string) => {

  const url = `${DRACIN_BASE_URL}/${path}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Dracin API Error: ${res.status}`);
  }

  return res.json();
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
  getCategory: (category: string, page = 1) => fetchFromApi<Movie>({ action: category, page }),
};

export const sportsApi = {
  getLiveMatches: () =>
    fetchSportsApi({
      type: "matches",
      sport: "football",
      status: "inprogress"
    }),

  getUpcomingMatches: () =>
    fetchSportsApi({
      type: "matches",
      sport: "football",
      status: "notstarted"
    }),

  getFinishedMatches: () =>
    fetchSportsApi({
      type: "matches",
      sport: "football",
      status: "finished"
    }),

  getMatchDetail: (id: string) =>
    fetchSportsApi({
      type: "detail",
      id
    })
};

export const dracinApi = {

  trending: () =>
    fetchFromDracinApi("trending"),

  latest: () =>
    fetchFromDracinApi("latest"),

  foryou: () =>
    fetchFromDracinApi("foryou"),

  vip: () =>
    fetchFromDracinApi("vip"),

  dubindo: () =>
    fetchFromDracinApi("dubindo"),

  random: () =>
    fetchFromDracinApi("randomdrama"),

  populerSearch: () =>
    fetchFromDracinApi("populersearch"),
};