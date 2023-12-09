import { MediaType, MultiMediaResult } from "./common";

export type MediaStatus = "toWatch" | "watching" | "watched";

export type MediaDocument = {
    uid: string;
    mediaType: MediaType;
    mediaID: number;
    mediaStatus: MediaStatus;
}

export type MediaList = {
    watchcard: MultiMediaResult;
    media_type: MediaType;
    media_status: MediaStatus;
}

