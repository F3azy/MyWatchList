import React from 'react';
import { Flex, Grid, GridItem } from '@chakra-ui/react';
import Collection from './Collection';
import { collections } from './CollectionProps';

const Collections = () => {
  return (
    <Grid w="100%" templateColumns='repeat(6, 1fr)' gap={6}>
      {collections.map((collection) => 
        <GridItem key={collection.name}>
          <Collection name={collection.name} logoSrc={collection.logoSrc} videoSrc={collection.videoSrc} />
        </GridItem>
      )}
    </Grid>
  )
};

export default Collections;