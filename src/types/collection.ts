export type CollectionBox = {
  name: string;
  logoSrc: string;
  videoSrc: string;
};

export type WatchCardInfo = {
  title: string;
  id: number;
  media_type: "movie" | "tv";
};

type CollectionsInfo = {
  name: string;
  watchCards: WatchCardInfo[];
  urls: string[];
};

export type CollectionsList = {
  Marvel: CollectionsInfo;
  HarryPotter: CollectionsInfo;
  StarWars: CollectionsInfo;
  LordoftheRings: CollectionsInfo;
  PiratesOfCaribbean: CollectionsInfo;
  Twilight: CollectionsInfo;
};
