import WatchCard from "@/components/shared/WatchCard";
import { MediaList, MediaStatus } from "@/types/myList";
import { Box, Container, HStack, Text, VStack } from "@chakra-ui/react";
import { Draggable, Droppable } from "@hello-pangea/dnd";

const watchCardWidth = 250;

const WatchList = ({
  title,
  list,
  mediaList,
}: {
  title: string;
  list: MediaStatus;
  mediaList?: MediaList[];
}) => {
  return (
    <VStack w="full" alignItems="flex-start">
      <Text as="h2" fontSize="24px" letterSpacing={1}>
        {title}
      </Text>
      <Container
        maxW="full"
        p={0}
        variant="gradientBox"
        borderRadius="xl"
        overflowX="auto"
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
        <Droppable droppableId={list} direction="horizontal">
          {(provided, snapshot) => (
            <HStack
              ref={provided.innerRef}
              {...provided.droppableProps}
              minW="full"
              minH="100px"
              p={4}
              w={`calc(${watchCardWidth * (mediaList?.length as number)}px + ${
                20 * ((mediaList?.length as number) - 1)
              }px)`}
              gap="20px"
            >
              {mediaList?.map((media, index) => (
                <Draggable
                  draggableId={media.watchcard.id.toString()}
                  index={index}
                  key={media.watchcard.id}
                >
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      w={`${watchCardWidth}px`}
                      h="150px"
                    >
                      <WatchCard
                        watchCard={media.watchcard}
                        media_type={media.media_type}
                        useBackdrop
                        loaded
                      />
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </HStack>
          )}
        </Droppable>
      </Container>
    </VStack>
  );
};

export default WatchList;
