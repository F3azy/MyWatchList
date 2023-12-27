import { MediaType } from "@/types/common";

export const HomeCarousels: {
  titles: string[];
  media_type: (MediaType | undefined)[];
  urls: string[];
} = {
  titles: [
    "Trending Today",
    "Trending This Week",
    "Now Playing",
    "Upcoming Movies",
    "Popular Movies",
    "Top Rated Movies",
    "Airing Today",
    "On The Air",
    "Popular Series",
    "Top Rated Series",
  ],
  media_type: [
    undefined,
    undefined,
    "movie",
    "movie",
    "movie",
    "movie",
    "tv",
    "tv",
    "tv",
    "tv",
  ],
  urls: [
    `https://api.themoviedb.org/3/trending/all/day?api_key=${
      import.meta.env.VITE_MOVIE_API_KEY
    }&language=en-US`,
    `https://api.themoviedb.org/3/trending/all/week?api_key=${
      import.meta.env.VITE_MOVIE_API_KEY
    }&language=en-US&page=${Math.floor(Math.random() * (3 - 1 + 1) + 1)}`,
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${
      import.meta.env.VITE_MOVIE_API_KEY
    }&language=en-US&page=${Math.floor(Math.random() * (5 - 1 + 1) + 1)}`,
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${
      import.meta.env.VITE_MOVIE_API_KEY
    }&language=en-US&page=${Math.floor(Math.random() * (10 - 1 + 1) + 1)}`,
    `https://api.themoviedb.org/3/movie/popular?api_key=${
      import.meta.env.VITE_MOVIE_API_KEY
    }&language=en-US&page=${Math.floor(Math.random() * (10 - 1 + 1) + 1)}`,
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${
      import.meta.env.VITE_MOVIE_API_KEY
    }&language=en-US&page=${Math.floor(Math.random() * (10 - 1 + 1) + 1)}`,
    `https://api.themoviedb.org/3/tv/airing_today?api_key=${
      import.meta.env.VITE_MOVIE_API_KEY
    }&language=en-US&page=${Math.floor(Math.random() * (10 - 1 + 1) + 1)}`,
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=${
      import.meta.env.VITE_MOVIE_API_KEY
    }&language=en-US&page=${Math.floor(Math.random() * (10 - 1 + 1) + 1)}`,
    `https://api.themoviedb.org/3/tv/popular?api_key=${
      import.meta.env.VITE_MOVIE_API_KEY
    }&language=en-US&page=1${Math.floor(Math.random() * (10 - 1 + 1) + 1)}`,
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${
      import.meta.env.VITE_MOVIE_API_KEY
    }&language=en-US&page=${Math.floor(Math.random() * (10 - 1 + 1) + 1)}`,
  ],
};
