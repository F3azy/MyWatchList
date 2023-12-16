import WatchCard from "@/components/shared/WatchCard";
import { MediaList, MediaStatus } from "@/types/myList";
import {
  Box,
  Container,
  Flex,
  Text,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { Draggable, Droppable } from "@hello-pangea/dnd";

const watchCardWidth = 250;

const WatchList = ({
  title,
  list,
  mediaList,
  onClick
}: {
  title: string;
  list: MediaStatus;
  mediaList?: MediaList[];
  onClick: (media: MediaList) => void;
}) => {
  const [isSmallerThan768] = useMediaQuery("(max-width: 767px)");

  return (
    <VStack w="full" alignItems="flex-start">
      <Text as="h2" fontSize="24px" letterSpacing={1}>
        {title}
      </Text>
      <Container
        maxW="full"
        h="full"
        minH="100px"
        p={0}
        variant="gradientBox"
        borderRadius="xl"
        overflowY={{ base: "auto", md: "visible" }}
        overflowX={{ md: "auto" }}
        css={{
          "&::-webkit-scrollbar": {
            width: "13px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#56B4DC",
            border: "4px solid rgba(0, 0, 0, 0)",
            backgroundClip: "padding-box",
            borderRadius: "24px",
          },
        }}
      >
        <Droppable
          droppableId={list}
          direction={isSmallerThan768 ? "vertical" : "horizontal"}
          isDropDisabled={isSmallerThan768}
        >
          {(provided, snapshot) => (
            <Flex
              ref={provided.innerRef}
              {...provided.droppableProps}
              direction={{ base: "column", md: "row" }}
              minW={{ base: "250px", md: "full" }}
              p={4}
              w={{
                md: `calc(${
                  watchCardWidth * (mediaList?.length as number)
                }px + ${20 * ((mediaList?.length as number) - 1)}px)`,
              }}
              gap="20px"
            >
              {mediaList?.map((media, index) => (
                <Draggable
                  draggableId={media.watchcard.id.toString()}
                  index={index}
                  key={media.watchcard.id}
                  isDragDisabled={isSmallerThan768}
                >
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      w={`${watchCardWidth}px`}
                      h="150px"
                      onClick={isSmallerThan768 ? () => onClick(media) : () => {}}
                    >
                      <WatchCard
                        watchCard={media.watchcard}
                        media_type={media.media_type}
                        useBackdrop
                        loaded
                        isLink={!isSmallerThan768}
                      />
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Flex>
          )}
        </Droppable>
      </Container>
    </VStack>
  );
};

export default WatchList;
