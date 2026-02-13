export type Movie = {
  id: string | number;
  name: string;
  thumbnail: string;
  title: string;
  poster: string;
  backdrop?: string;
  rating?: number;
  year?: string | number;
  genre?: string;
  category?: string;
  description?: string;
  detailPath: string;
  video_url?: string;      // URL video utama
  trailerUrl?: string;     // URL trailer
  playerUrl?: string;
  seasons?: Season[];     // URL player alternatif
  episodes?: {             // kalau ada series
    title: string;
    playerUrl: string;
  }[];
};

export type Recommendation = {
  id: string;
  title: string;
  poster?: string;
  detailPath?: string;
};

export interface Episode {
  title?: string;
  playerUrl?: string;
  video_url?: string;
}

export interface Season {
  season: number;
  episodes: Episode[];
}


export interface ApiResponse<T> {
  success: boolean;
  category?: string;
  items: T[];
  total?: number;
  page?: number;
  totalPages?: number;
  hasMore?: boolean;
  data?: T;
}
