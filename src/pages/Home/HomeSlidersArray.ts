interface HomeSlidersArrayType {
    title: string,
    url: string,
    randomPage?: boolean,
    pageQuantity?: number,
}

export const HomeTrendingSlidersArray: Array<HomeSlidersArrayType> = [
  {
    title: "Trending Today",
    url: "trending/all/day",
  },
  {
    title: "Trending This Week",
    url: "trending/all/week",
    randomPage: true,
    pageQuantity: 3,
  },
]

export const HomeMovieSlidersArray: Array<HomeSlidersArrayType> = [
  {
    title: "Now Playing",
    url: "/now_playing",
    randomPage: true,
    pageQuantity: 5,
  },
  {
    title: "Upcoming Movies",
    url: "/upcoming",
    randomPage: true,
  },
  {
    title: "Popular Movies",
    url: "/popular",
    randomPage: true,
  },
  {
    title: "Top Rated Movies",
    url: "/top_rated",
    randomPage: true,
  },
]
 
export const HomeTVSlidersArray: Array<HomeSlidersArrayType> = [
  {
    title: "Airing Today",
    url: "/airing_today",
    randomPage: true,
  },
  {
    title: "On The Air",
    url: "/on_the_air",
    randomPage: true,
  },
  {
    title: "Popular Series",
    url: "/popular",
    randomPage: true,
  },
  {
    title: "Top Rated Series",
    url: "/top_rated",
    randomPage: true,
  },
];