// type HomeCarousel = {
//   title: string;
//   url: string;
//   type?: "tv" | "movie";
//   randomPage?: boolean;
//   pageQuantity?: number;
// };

// const URL = "https://api.themoviedb.org/3/";

// function getHomeURLS(HomeCarouselsArray: Array<HomeCarousel>): string[] {
//   return HomeCarouselsArray.map((carousel) => {
//     const randomPage = Math.floor(
//       Math.random() * ((carousel.pageQuantity || 10) - 1 + 1) + 1
//     );
//     return (
//       URL +
//       (carousel.type ? carousel.type : "") +
//       carousel.url +
//       `?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US${
//         carousel.randomPage ? `&page=${randomPage}` : ""
//       }`
//     );
//   });
// }

// export const HomeCarouselsArray: Array<HomeCarousel> = [
//   {
//     title: "Trending Today",
//     url: "trending/all/day",
//   },
//   {
//     title: "Trending This Week",
//     url: "trending/all/week",
//     randomPage: true,
//     pageQuantity: 3,
//   },
//   {
//     title: "Now Playing",
//     type: "movie",
//     url: "/now_playing",
//     randomPage: true,
//     pageQuantity: 5,
//   },
//   {
//     title: "Upcoming Movies",
//     type: "movie",
//     url: "/upcoming",
//     randomPage: true,
//   },
//   {
//     title: "Popular Movies",
//     type: "movie",
//     url: "/popular",
//     randomPage: true,
//   },
//   {
//     title: "Top Rated Movies",
//     type: "movie",
//     url: "/top_rated",
//     randomPage: true,
//   },
//   {
//     title: "Airing Today",
//     type: "tv",
//     url: "/airing_today",
//     randomPage: true,
//   },
//   {
//     title: "On The Air",
//     type: "tv",
//     url: "/on_the_air",
//     randomPage: true,
//   },
//   {
//     title: "Popular Series",
//     type: "tv",
//     url: "/popular",
//     randomPage: true,
//   },
//   {
//     title: "Top Rated Series",
//     type: "tv",
//     url: "/top_rated",
//     randomPage: true,
//   },
// ];

// export const HomeUrls = getHomeURLS(HomeCarouselsArray);

export const HomeCarousels = {
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
  urls: [
    // `https://api.themoviedb.org/3/trending/all/day?api_key=${
    //   import.meta.env.VITE_MOVIE_API_KEY
    // }&language=en-US`,
    // `https://api.themoviedb.org/3/trending/all/week?api_key=${
    //   import.meta.env.VITE_MOVIE_API_KEY
    // }&language=en-US&page=${Math.floor(Math.random() * (3 - 1 + 1) + 1)}`,
    // `https://api.themoviedb.org/3/movie/now_playing?api_key=${
    //   import.meta.env.VITE_MOVIE_API_KEY
    // }&language=en-US&page=${Math.floor(Math.random() * (5 - 1 + 1) + 1)}`,
    // `https://api.themoviedb.org/3/movie/upcoming?api_key=${
    //   import.meta.env.VITE_MOVIE_API_KEY
    // }&language=en-US&page=${Math.floor(Math.random() * (10 - 1 + 1) + 1)}`,
    // `https://api.themoviedb.org/3/movie/popular?api_key=${
    //   import.meta.env.VITE_MOVIE_API_KEY
    // }&language=en-US&page=${Math.floor(Math.random() * (10 - 1 + 1) + 1)}`,
    // `https://api.themoviedb.org/3/movie/top_rated?api_key=${
    //   import.meta.env.VITE_MOVIE_API_KEY
    // }&language=en-US&page=${Math.floor(Math.random() * (10 - 1 + 1) + 1)}`,
    // `https://api.themoviedb.org/3/tv/airing_today?api_key=${
    //   import.meta.env.VITE_MOVIE_API_KEY
    // }&language=en-US&page=${Math.floor(Math.random() * (10 - 1 + 1) + 1)}`,
    // `https://api.themoviedb.org/3/tv/on_the_air?api_key=${
    //   import.meta.env.VITE_MOVIE_API_KEY
    // }&language=en-US&page=${Math.floor(Math.random() * (10 - 1 + 1) + 1)}`,
    // `https://api.themoviedb.org/3/tv/popular?api_key=${
    //   import.meta.env.VITE_MOVIE_API_KEY
    // }&language=en-US&page=1${Math.floor(Math.random() * (10 - 1 + 1) + 1)}`,
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${
      import.meta.env.VITE_MOVIE_API_KEY
    }&language=en-US&page=${Math.floor(Math.random() * (10 - 1 + 1) + 1)}`,
  ],
};

