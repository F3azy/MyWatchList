import WatchCard from "@/components/shared/WatchCard";
import { MultiMediaResult } from "@/types/common";
import { Container, Grid, GridItem, Text, VStack } from "@chakra-ui/react";

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
          maxH="calc(75vh)"
          h="full"
          p={4}
          templateColumns="repeat(3, 1fr)"
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
        >
          {watchCards?.map((Watchcard) => (
            <GridItem>
              <WatchCard
                id={Watchcard.id}
                media_type={"movie"}
                title={Watchcard.name || Watchcard.title}
                SpecImageURL={Watchcard.poster_path}
              />
            </GridItem>
          ))}
        </Grid>
      </Container>
    </VStack>
  );
};

export default WatchList;
