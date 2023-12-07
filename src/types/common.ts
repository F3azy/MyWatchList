type BaseMediaData = {
  id: number;
  poster_path: string;
  backdrop_path: string;
};

type Movie = BaseMediaData & {
  title: string;
};

type TV = BaseMediaData & {
  name: string;
};

export type MultiMediaResult = Movie &
  TV & {
    media_type?: "movie" | "tv";
  };

export type MultiMedia = {
  results: MultiMediaResult[];
};
