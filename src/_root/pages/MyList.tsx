import WatchList from "@/components/pages/MyList/WatchList";
import { Grid, GridItem, VStack } from "@chakra-ui/react";
import { MultiMediaResult } from "@/types/common";
import { MediaDocument, MediaList, MediaStatus } from "@/types/myList";
import { useEffect, useState } from "react";

const mediaURL = "https://api.themoviedb.org/3/";

const firebaseImpostor: MediaDocument[] = [
  {
    uid: "lele",
    mediaType: "movie",
    mediaID: 259316,
    mediaStatus: "toWatch",
  },
  {
    uid: "lele",
    mediaType: "movie",
    mediaID: 338952,
    mediaStatus: "toWatch",
  },
  {
    uid: "lele",
    mediaType: "movie",
    mediaID: 338953,
    mediaStatus: "watched",
  },
  {
    uid: "lele",
    mediaType: "movie",
    mediaID: 1771,
    mediaStatus: "watching",
  },
  {
    uid: "lele",
    mediaType: "movie",
    mediaID: 363088,
    mediaStatus: "watching",
  },
  {
    uid: "lele",
    mediaType: "tv",
    mediaID: 4194,
    mediaStatus: "watching",
  },
];

const MyList = () => {
  const [lists, setLists] = useState<MediaList[]>([]);
  const [draggedID, setDraggedID] = useState<number | null>(null);

  useEffect(() => {
    setLists([]);
    firebaseImpostor.map((impostor) =>
      fetch(
        mediaURL +
          impostor.mediaType +
          "/" +
          impostor.mediaID +
          `?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US`
      )
        .then((response) => response.json())
        .then((result: MultiMediaResult) =>
          setLists((prev) => [
            ...prev,
            {
              watchcard: result,
              media_type: impostor.mediaType,
              media_status: impostor.mediaStatus,
            },
          ])
        )
    );
  }, []);

  const handleOnDragStart = (id: number) => {
    setDraggedID(id);
  };

  const handleOnDragEnd = (id: number, targetList: MediaStatus) => {
    if (draggedID === null) return;

    const updatedLists = lists.map((list) => {
      if (list.watchcard.id === id) {
        return { ...list, media_status: targetList };
      }

      return list;
    });

    setLists(updatedLists);
    setDraggedID(null);
  };

  return (
    <VStack w="full">
      <Grid w="full" h="full" templateColumns="repeat(3, 1fr)" gap={20}>
        <GridItem>
          <WatchList
            title={"To Watch"}
            list="toWatch"
            mediaList={lists.filter((list) => list.media_status === "toWatch")}
            onDragStart={handleOnDragStart}
            onDragEnd={handleOnDragEnd}
          />
        </GridItem>
        <GridItem>
          <WatchList
            title={"Watching"}
            list="watching"
            mediaList={lists.filter((list) => list.media_status === "watching")}
            onDragStart={handleOnDragStart}
            onDragEnd={handleOnDragEnd}
          />
        </GridItem>
        <GridItem>
          <WatchList
            title={"Watched"}
            list="watched"
            mediaList={lists.filter((list) => list.media_status === "watched")}
            onDragStart={handleOnDragStart}
            onDragEnd={handleOnDragEnd}
          />
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default MyList;
