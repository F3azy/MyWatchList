import WatchList from "@/components/pages/MyList/WatchList";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { MultiMediaResult } from "@/types/common";
import { Column, MediaDocument, MediaList, MediaStatus } from "@/types/myList";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useNavigate } from "react-router-dom";

const mediaURL = "https://api.themoviedb.org/3/";

const firebaseImpostor: MediaDocument[] = [
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
    mediaID: 259316,
    mediaStatus: "toWatch",
    order: 0,
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

  const [modalWatchCard, setModalWatchCard] = useState<MediaList | null>(null);
  const [newStatus, setNewStatus] = useState<MediaStatus>("toWatch");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

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

  function getDragElements(
    startID: MediaStatus,
    finishID: MediaStatus,
    draggedID: string
  ) {
    const start: Column = Columns.find(
      (column) => column.id === startID
    ) as Column;
    const finish: Column = Columns.find(
      (column) => column.id === finishID
    ) as Column;

    const dragged = lists.find(
      (item) => item.watchcard.id.toString() === draggedID
    ) as MediaList;

    return { start, finish, dragged };
  }

  function moveElement(
    startID: MediaStatus,
    finishID: MediaStatus,
    dragged: MediaList,
    destinationIdx: number
  ) {
    let draggedFromList = Array.from(lists)
      .filter((list) => list.media_status === startID)
      .sort((a, b) => a.order - b.order);

    let dropList =
      startID !== finishID
        ? Array.from(lists)
            .filter((list) => list.media_status === finishID)
            .sort((a, b) => a.order - b.order)
        : [];

    let restOfElem = Array.from(lists)
      .filter(
        (list) =>
          list.media_status !== startID && list.media_status !== finishID
      )
      .sort((a, b) => a.order - b.order);

    draggedFromList.splice(dragged.order, 1);

    if (startID === finishID)
      draggedFromList.splice(destinationIdx, 0, dragged);

    draggedFromList.forEach((el, idx) => (el.order = idx));

    if (startID !== finishID) {
      dragged.media_status = finishID;

      dropList.splice(destinationIdx, 0, dragged);
      dropList.forEach((el, idx) => (el.order = idx));
    }

    return [...draggedFromList, ...dropList, ...restOfElem];
  }

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const { start, finish, dragged } = getDragElements(
      source.droppableId as MediaStatus,
      destination.droppableId as MediaStatus,
      draggableId
    );

    setLists(moveElement(start.id, finish.id, dragged, destination.index));
  };

  function openModal(media: MediaList) {
    setModalWatchCard(media);
    onOpen();
  }

  function closeModal() {
    onClose();
    setModalWatchCard(null);
    setNewStatus("toWatch");
  }

  function changeStatusState(event: React.ChangeEvent<HTMLSelectElement>) {
    console.log(event.currentTarget.value);

    setNewStatus(event.currentTarget.value as MediaStatus);
  }

  function changeStatus(): void {
    const { start, finish, dragged } = getDragElements(
      modalWatchCard?.media_status as MediaStatus,
      newStatus,
      modalWatchCard?.watchcard.id.toString() as string
    );

    if (start === finish) return;

    setLists(moveElement(start.id, finish.id, dragged, 0));
    setNewStatus("toWatch");
    onClose();
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Flex
          direction={{ base: "row", md: "column" }}
          w={{ base: "auto", xl: "full" }}
          maxW="full"
          h={{ base: "calc(100vh - 112px)", md: "auto" }}
          gap={{ base: 5, md: 5 }}
          overflowX={{ base: "scroll", md: "visible" }}
        >
          {Columns.map((column) => {
            return (
              <WatchList
                onClick={openModal}
                key={column.id}
                title={column.title}
                list={column.id}
                mediaList={lists
                  .filter((list) => list.media_status === column.id)
                  .sort((a, b) => a.order - b.order)}
              />
            );
          })}
        </Flex>
      </DragDropContext>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false}
        isCentered
        size="md"
        autoFocus={false}
        returnFocusOnClose={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalWatchCard?.watchcard.name || modalWatchCard?.watchcard.title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="full" gap="24px">
              <VStack w="full" align="flex-start" gap="8px">
                <Text color="brand.secondary">Change Status</Text>
                <Select variant="base" onChange={changeStatusState}>
                  <option value="toWatch">To Watch</option>
                  <option value="watching">Watching</option>
                  <option value="watched">Watched</option>
                </Select>
                <Button
                  w="full"
                  variant="full"
                  onClick={() => {
                    changeStatus();
                  }}
                >
                  Change
                </Button>
              </VStack>
              <Button
                w="full"
                variant="full"
                onClick={() => {
                  navigate(
                    "/info/" +
                      modalWatchCard?.media_type +
                      "/" +
                      modalWatchCard?.watchcard.id +
                      "/" +
                      (modalWatchCard?.watchcard.title?.replaceAll(" ", "-") ||
                        modalWatchCard?.watchcard.name?.replaceAll(" ", "-"))
                  );
                }}
              >
                Media Info
              </Button>
              <Divider borderColor="brand.secondary" />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button w="full" variant="outline" onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyList;
