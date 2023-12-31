export type APIResults<Results> = {
  id?: number;
  page?: number;
  results: Results;
  total_pages?: number;
  total_results?: number;
};

export type MediaType = "movie" | "tv";

export type BaseMediaResult = {
  backdrop_path: string;
  id: number;
  poster_path: string;
};

export type MultiMedia = BaseMediaResult & {
  media_type?: MediaType;
  name?: string;
  title?: string;
};

export type MediaImageAttributes = {
  file_path: string;
  height: number;
  width: number;
};

export type MediaImages = {
  backdrops: MediaImageAttributes[];
  logos: MediaImageAttributes[];
  posters: MediaImageAttributes[];
};

export type Genre = {
  id: number;
  name: string;
}

export type Genres = {
  genres: Genre[];
};
