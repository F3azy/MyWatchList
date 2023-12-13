import WatchList from "@/components/pages/MyList/WatchList";
import { VStack } from "@chakra-ui/react";
import { MultiMediaResult } from "@/types/common";
import { Column, MediaDocument, MediaList, MediaStatus } from "@/types/myList";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

const mediaURL = "https://api.themoviedb.org/3/";

const firebaseImpostor: MediaDocument[] = [
  {
    uid: "lele",
    mediaType: "movie",
    mediaID: 259316,
    mediaStatus: "toWatch",
    order: 0,
  },
  {
    uid: "lele",
    mediaType: "movie",
    mediaID: 338952,
    mediaStatus: "toWatch",
    order: 1,
  },
  {
    uid: "lele",
    mediaType: "movie",
    mediaID: 338953,
    mediaStatus: "watched",
    order: 0,
  },
  {
    uid: "lele",
    mediaType: "movie",
    mediaID: 1771,
    mediaStatus: "watching",
    order: 0,
  },
  {
    uid: "lele",
    mediaType: "movie",
    mediaID: 363088,
    mediaStatus: "watching",
    order: 1,
  },
  {
    uid: "lele",
    mediaType: "tv",
    mediaID: 4194,
    mediaStatus: "watching",
    order: 2,
  },
  {
    uid: "lele",
    mediaType: "movie",
    mediaID: 151250,
    mediaStatus: "watched",
    order: 1,
  },
];

const Columns: Column[] = [
  {
    id: "toWatch",
    title: "To Watch",
  },
  {
    id: "watching",
    title: "Watching",
  },
  {
    id: "watched",
    title: "Watched",
  },
];

const MyList = () => {
  const [lists, setLists] = useState<MediaList[]>([]);
  const [draggedID, setDraggedID] = useState<number | null>(null);

  useEffect(() => {
    setLists([]);
    const fetchPromises = firebaseImpostor.map((impostor) =>
      fetch(
        mediaURL +
          impostor.mediaType +
          "/" +
          impostor.mediaID +
          `?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US`
      )
        .then((response) => response.json())
        .then((result: MultiMediaResult) => ({
          watchcard: result,
          media_type: impostor.mediaType,
          media_status: impostor.mediaStatus,
          order: impostor.order,
        }))
    );

    Promise.all(fetchPromises).then((newLists) => {
      setLists(newLists);
    });
  }, []);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const start: Column = Columns.find(
      (column) => column.id === source.droppableId
    ) as Column;
    const finish: Column = Columns.find(
      (column) => column.id === destination.droppableId
    ) as Column;

    const dragged = lists.find(
      (item) => item.watchcard.id.toString() === draggableId
    ) as MediaList;

    if (start === finish) {
      let currentList = Array.from(lists).filter(
        (list) => list.media_status === start.id
      );

      let restOfElem = Array.from(lists).filter(
        (list) => list.media_status !== start.id
      );

      currentList.splice(source.index, 1);
      currentList.splice(destination.index, 0, dragged);

      currentList.forEach((el, idx) => (el.order = idx));

      setLists([...restOfElem, ...currentList]);
      return;
    }

    let draggedFromList = Array.from(lists).filter(
      (list) => list.media_status === start.id
    );

    let dropList = Array.from(lists).filter(
      (list) => list.media_status === finish.id
    );

    let restOfElem = Array.from(lists).filter(
      (list) =>
        list.media_status !== start.id && list.media_status !== finish.id
    );

    draggedFromList.splice(source.index, 1);
    draggedFromList.forEach((el, idx) => (el.order = idx));

    dragged.media_status = destination.droppableId as MediaStatus;

    dropList.splice(destination.index, 0, dragged);
    dropList.forEach((el, idx) => (el.order = idx));

    setLists([...restOfElem, ...draggedFromList, ...dropList]);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <VStack w="full" gap={{base: 3, md: 5}}>
        {Columns.map((column) => {
          return (
            <WatchList
              key={column.id}
              title={column.title}
              list={column.id}
              mediaList={lists
                .filter((list) => list.media_status === column.id)
                .sort((a, b) => a.order - b.order)}
            />
          );
        })}
      </VStack>
    </DragDropContext>
  );
};

export default MyList;
