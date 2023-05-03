import React from 'react';
import { Flex } from '@chakra-ui/react';
import Collection from './Collection';
import { collections } from './CollectionProps';

const Collections = () => {
  return (
    <Flex wrap={"wrap"} rowGap={"16px"} columnGap={"16px"} justify={"center"}>
      {collections.map((collection) => 
        <Collection key={collection.name} logoSrc={collection.logoSrc} videoSrc={collection.videoSrc} />
      )}
    </Flex>
  )
};

export default Collections;