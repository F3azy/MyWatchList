import React, { useEffect, useState } from 'react';
import { Flex, Text, Grid, GridItem } from '@chakra-ui/react';
import WatchCard from '../../components/WatchCard';
import { useParams } from 'react-router-dom';
import { collections, collectionsList } from './collectionsArray';

const CollectionList = () => {
  const { name } = useParams();

  return (
    <Flex w="100%" direction="column" rowGap="28px">
      <Text fontSize="32px" fontWeight="bold">
        {collections[name as keyof collectionsList].name}
      </Text>
      <Grid w="100%" templateColumns='repeat(6, 1fr)' gap={6}>
      {collections[name as keyof collectionsList]?.watchCards.map((watchcard) => 
        <GridItem w='100%' key={watchcard.id}>
          <WatchCard givenWidth='100%' id={watchcard.id} type={watchcard.type} />
        </GridItem>
      )}
      </Grid>
    </Flex>
  )
};

export default CollectionList;