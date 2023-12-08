import WatchList from "@/components/pages/MyList/WatchList";
import { Grid, GridItem, VStack } from "@chakra-ui/react";
import { CollectionsArrays } from "@/constans/CollectionsArrays";
import useMultipleFetch from "@/hooks/useMultipleFetch";
import { MultiMediaResult } from "@/types/common";

const MyList = () => {
  const { data: watchCards } = useMultipleFetch<MultiMediaResult>(
    CollectionsArrays["HarryPotter"].urls
  );
  return (
    <VStack w="full">
      <Grid w="full" h="full" templateColumns="repeat(3, 1fr)" gap={20}>
        <GridItem>
          <WatchList title={"To Watch"} watchCards={watchCards} />
        </GridItem>
        <GridItem>
          <WatchList title={"Watching"} />
        </GridItem>
        <GridItem>
          <WatchList title={"Watched"} />
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default MyList;
