export type CollectionBox = {
  name?: string;
  logoSrc: string;
  videoSrc: string;
};

export type WatchCardInfo = {
  title: string;
  id: number;
  type: string;
};

type CollectionsInfo = {
  name: string;
  watchCards: WatchCardInfo[];
};

export type CollectionsList = {
  Marvel: CollectionsInfo;
  HarryPotter: CollectionsInfo;
  StarWars: CollectionsInfo;
  LordoftheRings: CollectionsInfo;
  PiratesOfCaribbean: CollectionsInfo;
  Twilight: CollectionsInfo;
};
