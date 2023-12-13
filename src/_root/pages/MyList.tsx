import WatchList from "@/components/pages/MyList/WatchList";
import { VStack } from "@chakra-ui/react";
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
  {
    uid: "lele",
    mediaType: "movie",
    mediaID: 151250,
    mediaStatus: "watched",
  },
];

const Columns: {
  title: string;
  id: MediaStatus;
}[] = [
  {
    title: "To Watch",
    id: "toWatch",
  },
  {
    title: "Watching",
    id: "watching",
  },
  {
    title: "Watched",
    id: "watched",
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
    <VStack w="full" gap={5}>
      {Columns.map((column) => {
        return (
          <WatchList
            title={column.title}
            list={column.id}
            mediaList={lists.filter((list) => list.media_status === column.id)}
            onDragStart={handleOnDragStart}
            onDragEnd={handleOnDragEnd}
          />
        );
      })}
    </VStack>
  );
};

export default MyList;
