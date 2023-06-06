interface HomeSlidersArrayType {
    title: string,
    url: string,
}

export const HomeTrendingSlidersArray: Array<HomeSlidersArrayType> = [
  {
    title: "Trending Today",
    url: "trending/all/day",
  },
  {
    title: "Trending This Week",
    url: "trending/all/week",
  },
]

export const HomeMovieSlidersArray: Array<HomeSlidersArrayType> = [
  {
    title: "Now Playing",
    url: "/now_playing",
  },
  {
    title: "Popular Movies",
    url: "/popular",
  },
  {
    title: "Top Rated Movies",
    url: "/top_rated",
  },
  {
    title: "Upcoming Movies",
    url: "/upcoming",
  },
]
 
export const HomeTVSlidersArray: Array<HomeSlidersArrayType> = [
  {
    title: "Airing Today",
    url: "/airing_today",
  },
  {
    title: "On The Air",
    url: "/on_the_air",
  },
  {
    title: "Popular Series",
    url: "/popular",
  },
  {
    title: "Top Rated Series",
    url: "/top_rated",
  },
];