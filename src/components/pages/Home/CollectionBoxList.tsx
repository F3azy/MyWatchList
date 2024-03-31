import CollectionBox from "@/components/pages/Home/CollectionBox";
import CollectionBoxes from "@/constans/CollectionBoxes";
import { Grid, GridItem } from "@chakra-ui/react";

const CollectionList = () => {
  return (
    <Grid
      templateColumns={{ base: "repeat(3, 1fr)", xl: "repeat(6, 1fr)" }}
      rowGap={{ base: 4, xl: 5 }}
      columnGap={{ base: 3, xl: 5 }}
    >
      {CollectionBoxes.map((collection) => (
        <GridItem key={collection.name}>
          <CollectionBox
            name={collection.name}
            logoSrc={collection.logoSrc}
            videoSrc={collection.videoSrc}
          />
        </GridItem>
      ))}
    </Grid>
  );
};

export default CollectionList;
