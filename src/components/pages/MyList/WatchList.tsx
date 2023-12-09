import WatchCard from "@/components/shared/WatchCard";
import { MediaList, MediaStatus } from "@/types/myList";
import { Container, Grid, GridItem, Text, VStack } from "@chakra-ui/react";

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
    <VStack h="full">
      <Text as="h2" fontSize="24px" letterSpacing={1}>
        {title}
      </Text>
      <Container h="full" p={0} variant="gradientBox" borderRadius="xl">
        <Grid
          h="calc(75vh)"
          p={4}
          templateColumns="repeat(3, 1fr)"
          gridAutoRows="min-content"
          gap={5}
          overflowY="scroll"
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
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {mediaList?.map((media) => (
            <GridItem
              key={media.watchcard.id}
              draggable
              onDragStart={e => handleDragStart(e, media.watchcard.id)}
            >
              <WatchCard
                watchCard={media.watchcard}
                media_type={media.media_type}
              />
            </GridItem>
          ))}
        </Grid>
      </Container>
    </VStack>
  );
};

export default WatchList;
