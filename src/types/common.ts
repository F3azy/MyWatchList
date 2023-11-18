type BaseFetchType = {
  id: number;
  poster_path: string;
  backdrop_path: string;
}

export type Movie = BaseFetchType & {
  title: string;
};

export type TV = BaseFetchType & {
  name: string;
};

export type Multi = Movie & TV & {
  media_type?: "movie" | "tv";
}


