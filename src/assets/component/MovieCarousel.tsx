import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { type Movie } from "../types/Movie";
import MovieCard from "./MovieCard";

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  seeAllLink?: string;
}

export default function MovieCarousel({ title, movies, seeAllLink }: MovieCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkArrows = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      // Initial check after a short delay for content to load
      const timer = setTimeout(() => checkArrows(), 100);
      scrollContainer.addEventListener("scroll", checkArrows);
      window.addEventListener("resize", checkArrows);

      return () => {
        clearTimeout(timer);
        scrollContainer.removeEventListener("scroll", checkArrows);
        window.removeEventListener("resize", checkArrows);
      };
    }
  }, [movies]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-4 px-6 md:px-16">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {seeAllLink && (
          <Link to={seeAllLink} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            See All
          </Link>
        )}
      </div>
      <div className="group relative">
        {showLeftArrow && (
          <button onClick={() => scroll("left")} className="absolute left-0 top-0 bottom-0 z-20 -mb-4 flex w-16 items-center justify-center bg-gradient-to-r from-black to-transparent opacity-0 transition-opacity group-hover:opacity-100" aria-label="Scroll left">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-2xl transition hover:bg-black/80">‹</span>
          </button>
        )}
        <div ref={scrollContainerRef} className="scrollbar-hide flex space-x-4 overflow-x-auto px-6 pb-4 md:px-16 snap-x snap-mandatory scroll-smooth">
          {movies.map((movie) => (
            <div key={movie.id} className="w-48 flex-shrink-0 transform transition-transform duration-300 ease-in-out hover:z-20 hover:scale-105 md:w-56 snap-start">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        {showRightArrow && (
          <button onClick={() => scroll("right")} className="absolute right-0 top-0 bottom-0 z-20 -mb-4 flex w-16 items-center justify-center bg-gradient-to-l from-black to-transparent opacity-0 transition-opacity group-hover:opacity-100" aria-label="Scroll right">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-2xl transition hover:bg-black/80">›</span>
          </button>
        )}
      </div>
    </section>
  );
}