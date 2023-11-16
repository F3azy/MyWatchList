import { Flex, Text, Grid, GridItem } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import WatchCard from "@/components/shared/WatchCard";
import { CollectionsArrays } from "@/constans/CollectionsArrays";
import { Multi } from "@/types/common";
import { CollectionsList } from "@/types/collection";
import useMultipleFetch from "@/hooks/useMultipleFetch";

const CollectionList = () => {
  const { name } = useParams();

  const { data: watchCards } = useMultipleFetch<Multi>(
    CollectionsArrays[name as keyof CollectionsList].urls
  );

  return (
    <Flex w="100%" direction="column" rowGap="28px">
      <Text fontSize="32px" fontWeight="bold">
        {CollectionsArrays[name as keyof CollectionsList].name}
      </Text>
      <Grid w="100%" templateColumns="repeat(6, 1fr)" gap={6}>
        {watchCards?.map((watchcard, idx) => (
          <GridItem w="100%" key={watchcard.id}>
            <WatchCard
              id={watchcard.id}
              media={
                CollectionsArrays[name as keyof CollectionsList].watchCards[idx].media
              }
              title={watchcard.name || watchcard.title}
              SpecImageURL={watchcard.poster_path}
            />
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
};

export default CollectionList;
