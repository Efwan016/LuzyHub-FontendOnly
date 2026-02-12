export type Movie = {
  id: string | number;
  title: string;
  poster: string;
  backdrop?: string;
  rating?: number;
  year?: string | number;
  genre?: string;
  category?: string;
  description?: string;
  detailPath: string;
};

export interface ApiResponse<T> {
  success: boolean;
  category?: string;
  items: T[];
  total?: number;
  page?: number;
  hasMore?: boolean;
}

