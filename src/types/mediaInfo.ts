export type MediaImageProp = {
  file_path: string;
  height: number;
  width: number;
};

export type MediaImages = {
  backdrops: MediaImageProp[];
  logos: MediaImageProp[];
  posters: MediaImageProp[];
};

export type Provider = {
  display_priority: number;
  logo_path: string;
  provider_name: string;
};

export type Providers = {
  results: {
    [key: string]: {
      ads: Provider[];
      buy: Provider[];
      flatrate: Provider[];
      free: Provider[];
    };
  };
};

export type Videos = {
  results: {
    key: string;
    name: string;
    official: boolean;
    site: string;
    type: string;
  }[];
};

type BaseDetails = {
  id: number;
  poster_path: string;
  backdrop_path: string;
  genres: {
    name: string;
  }[];
  homepage: string;
  overview: string;
  vote_average: number;
  tagline: string;
};

type MovieDetails = BaseDetails & {
  title: string;
  runtime: number;
  release_date: string;
};

type TVDetails = BaseDetails & {
  name: string;
  first_air_date: string;
  last_air_date: string;
  next_episode_to_air: Episode;
  number_of_seasons: number;
  episode_run_time: number[];
  created_by: {
    name: string;
  }[];
  seasons: {
    id: number;
    season_number: number;
    episode_count: number;
    air_date: string;
    name: string;
    overview: string;
    poster_path: string;
  }[];
};

export type MultiDetails = MovieDetails & TVDetails;

export type MultiCertification = {
  results: {
    iso_3166_1: string;
    rating?: string;
    release_dates?: {
      certification: string;
    }[];
  }[];
};

export type MediaProductionMember = {
  id: number;
  character: string;
  name: string;
  profile_path: string;
  job: string;
};

export type Episode = {
  episode_number: number;
  season_number: number;
  air_date: string;
  name: string;
  overview: string;
  runtime: number;
  still_path: string;
  vote_average: string;
  guest_stars: MediaProductionMember[];
};

export type Season = {
  name: string;
  poster_path: string;
  season_number: number;
  episodes: Episode[];
};

export type Credits = {
  cast: MediaProductionMember[];
  crew: MediaProductionMember[];
};
