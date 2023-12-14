import { Flex, Text, Grid, GridItem } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import WatchCard from "@/components/shared/WatchCard";
import { CollectionsArrays } from "@/constans/CollectionsArrays";
import { MultiMediaResult } from "@/types/common";
import { CollectionsList } from "@/types/collection";
import useMultipleFetch from "@/hooks/useMultipleFetch";

const CollectionList = () => {
  const { name } = useParams();

  const { data: watchCards } = useMultipleFetch<MultiMediaResult>(
    CollectionsArrays[name as keyof CollectionsList].urls
  );

  return (
    <Flex w="full" direction="column" rowGap={{ base: "16px", xl: "28px" }}>
      <Text fontSize="32px" fontWeight="bold">
        {CollectionsArrays[name as keyof CollectionsList].name}
      </Text>
      <Grid
        templateColumns={{ base: "repeat(3, 1fr)", xl: "repeat(8, 1fr)" }}
        gap={{ base: 3, md: 6 }}
      >
        {watchCards?.map((watchcard, idx) => (
          <GridItem w="full" key={watchcard.id}>
            <WatchCard
              watchCard={watchcard}
              media_type={
                CollectionsArrays[name as keyof CollectionsList].watchCards[idx]
                  .media_type
              }
            />
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
};

export default CollectionList;
