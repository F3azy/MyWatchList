import WatchCard from "@/components/shared/WatchCard";
import { MultiMediaResult } from "@/types/common";
import { Container, Grid, GridItem, Text, VStack } from "@chakra-ui/react";

function watchCardAllowDrop(event: React.DragEvent<HTMLDivElement>) {
  event.preventDefault();
}

function watchCardDrop(event: React.DragEvent<HTMLDivElement>) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  event.currentTarget.appendChild(document.getElementById(data) as HTMLElement);
}

function watchCardDrag(event: React.DragEvent<HTMLDivElement>) {
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text", event.currentTarget.id);
}

const WatchList = ({
  title,
  watchCards,
}: {
  title: string;
  watchCards?: MultiMediaResult[];
}) => {
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
          onDragOver={watchCardAllowDrop}
          onDrop={watchCardDrop}
        >
          {watchCards?.map((watchcard) => (
            <GridItem
              id={watchcard.id.toString()}
              draggable
              onDragStart={watchCardDrag}
            >
              <WatchCard
                id={watchcard.id}
                media_type={"movie"}
                title={watchcard.name || watchcard.title}
                SpecImageURL={watchcard.poster_path}
              />
            </GridItem>
          ))}
        </Grid>
      </Container>
    </VStack>
  );
};

export default WatchList;
