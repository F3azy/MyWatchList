import React from 'react';
import { Flex } from '@chakra-ui/react';
import Collection from './Collection';
import { collections } from './CollectionProps';

const Collections = () => {
  return (
    <Flex>
      {collections.map((collection) => 
        <Collection logoSrc={collection.logoSrc} videoSrc={collection.videoSrc} />
      )}
    </Flex>
  )
};

export default Collections;