import { MediaType } from "./common";

export type CollectionBox = {
  logoSrc: string;
  name: string;
  videoSrc: string;
};

export type WatchCardInfo = {
  id: number;
  media_type: MediaType;
  title: string;
};

type CollectionsInfo = {
  name: string;
  urls: string[];
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
