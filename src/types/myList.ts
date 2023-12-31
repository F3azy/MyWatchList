import { MediaType, MultiMedia } from "./common";

export type MediaStatus = "toWatch" | "watching" | "watched";

export type MediaDocument = {
  mediaID: number;
  mediaStatus: MediaStatus;
  mediaType: MediaType;
  order: number;
  uid: string;
};

export type MediaList = {
  media_status: MediaStatus;
  media_type: MediaType;
  order: number;
  watchcard: MultiMedia;
};

export type Column = {
  id: MediaStatus;
  title: string;
};
