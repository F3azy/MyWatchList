type BaseMediaData = {
  id: number;
  poster_path: string;
  backdrop_path: string;
};

type Movie = {
  title: string;
};

type TV = {
  name: string;
};

export type MediaType = "movie" | "tv";

export type MultiMediaResult = BaseMediaData & Movie &
  TV & {
    media_type?: MediaType;
  };

export type MultiMedia = {
  results: MultiMediaResult[];
};

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

export type Genres = {
  genres: {
    id: number;
    name: string;
  }[];
};