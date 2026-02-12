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
