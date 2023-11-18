export type MediaImages = {
  backdrops: {
    file_path: string;
  }[];
  logos: {
    file_path: string;
    height: number;
  }[];
  posters: {
    file_path: string;
  }[];
};

export type Similar = {
  results: {
    id: number;
    poster_path: string;
    name?: string;
    title?: string;
  }[];
};

type Provider = {
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
  number_of_seasons: number;
  seasons: {
    id: number;
    season_number: number;
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
