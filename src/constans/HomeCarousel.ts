import { MediaType } from "@/types/common";
import { createApiUrl } from "@/utils";

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
    createApiUrl("trending/all/day"),
    createApiUrl(
      "trending/all/week",
      `&page=${Math.floor(Math.random() * (3 - 1 + 1) + 1)}`
    ),
    createApiUrl(
      "movie/now_playing",
      `&page=${Math.floor(Math.random() * (5 - 1 + 1) + 1)}`
    ),
    createApiUrl(
      "movie/upcoming",
      `&page=${Math.floor(Math.random() * (10 - 1 + 1) + 1)}`
    ),
    createApiUrl(
      "movie/popular",
      `&page=${Math.floor(Math.random() * (10 - 1 + 1) + 1)}`
    ),
    createApiUrl(
      "movie/top_rated",
      `&page=${Math.floor(Math.random() * (10 - 1 + 1) + 1)}`
    ),
    createApiUrl(
      "tv/airing_today",
      `&page=${Math.floor(Math.random() * (10 - 1 + 1) + 1)}`
    ),
    createApiUrl(
      "tv/on_the_air",
      `&page=${Math.floor(Math.random() * (10 - 1 + 1) + 1)}`
    ),
    createApiUrl(
      "tv/top_rated",
      `&page=${Math.floor(Math.random() * (10 - 1 + 1) + 1)}`
    ),
  ],
};
