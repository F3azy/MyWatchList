import React from 'react';
import { Flex } from '@chakra-ui/react';
import Collection from './Collection';
import { collections } from './CollectionProps';

const Collections = () => {
  return (
    <Flex wrap="wrap" rowGap="24px" justify="space-between">
      {collections.map((collection) => 
        <Collection key={collection.name} name={collection.name} logoSrc={collection.logoSrc} videoSrc={collection.videoSrc} />
      )}
    </Flex>
  )
};

export default Collections;