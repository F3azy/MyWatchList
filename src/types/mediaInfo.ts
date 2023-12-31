import { BaseMediaResult, Genre } from "./common";

export type Provider = {
  display_priority: number;
  logo_path: string;
  provider_name: string;
};

export type Providers = {
  [key: string]: {
    ads: Provider[];
    buy: Provider[];
    flatrate: Provider[];
    free: Provider[];
  };
};

export type Video = {
  key: string;
  name: string;
  official: boolean;
  site: string;
  type: string;
};

export type MultiCertification = {
  iso_3166_1: string;
  rating?: string;
  release_dates?: {
    certification: string;
  }[];
};

export type MediaProductionMember = {
  character: string;
  id: number;
  job: string;
  name: string;
  profile_path: string;
};

export type Episode = {
  air_date: string;
  episode_number: number;
  guest_stars: MediaProductionMember[];
  id: number;
  name: string;
  overview: string;
  runtime: number;
  season_number: number;
  still_path: string;
  vote_average: string;
};

type BaseSeasonDetails = {
  air_date: string;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

export type Season = BaseSeasonDetails & {
  _id: string;
  episodes: Episode[];
};

export type Credits = {
  cast: MediaProductionMember[];
  crew: MediaProductionMember[];
};

type BaseDetails = BaseMediaResult & {
  genres: Genre[];
  homepage: string;
  overview: string;
  tagline: string;
  vote_average: number;
};

type MovieDetails = {
  release_date: string;
  runtime: number;
  title: string;
};

type TVDetails = {
  created_by: {
    name: string;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  last_air_date: string;
  name: string;
  next_episode_to_air: Episode;
  number_of_seasons: number;
  seasons: BaseSeasonDetails &
    {
      episode_count: number;
    }[];
};

export type MultiDetails = BaseDetails & MovieDetails & TVDetails;
