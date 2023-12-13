import WatchCard from "@/components/shared/WatchCard";
import { MediaList, MediaStatus } from "@/types/myList";
import { Box, Container, HStack, Text, VStack } from "@chakra-ui/react";

const watchCardWidth = 250;

const WatchList = ({
  title,
  list,
  mediaList,
  onDragStart,
  onDragEnd,
}: {
  title: string;
  list: MediaStatus;
  mediaList?: MediaList[];
  onDragStart: (id: number) => void;
  onDragEnd: (id: number, targetList: MediaStatus) => void;
}) => {
  const handleDragStart = (e: React.DragEvent, id: number) => {
    onDragStart(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("watchCardID", id.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = parseInt(e.dataTransfer.getData("watchCardID"), 10);
    onDragEnd(id, list);
  };

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
        <HStack
          minW="full"
          minH="100px"
          p={4}
          w={`calc(${watchCardWidth * (mediaList?.length as number)}px + ${
            20 * ((mediaList?.length as number) - 1)
          }px)`}
          gap="20px"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {mediaList?.map((media) => (
            <Box
              w={`${watchCardWidth}px`}
              h="150px"
              key={media.watchcard.id}
              draggable
              onDragStart={(e) => handleDragStart(e, media.watchcard.id)}
            >
              <WatchCard
                watchCard={media.watchcard}
                media_type={media.media_type}
                useBackdrop
              />
            </Box>
          ))}
        </HStack>
      </Container>
    </VStack>
  );
};

export default WatchList;
