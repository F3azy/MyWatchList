import React from 'react';
import { Flex, HStack, Text } from '@chakra-ui/react';
import WatchCard from '../../components/WatchCard';
import { useParams } from 'react-router-dom';

const CollectionList = () => {
  const { name } = useParams();

  return (
    <Flex w="100%" direction="column" rowGap="28px">
    <HStack columnGap="16px">
      <Text fontSize="32px" fontWeight="bold">
        {name}
      </Text>
    </HStack>
    <Flex w="100%" wrap="wrap" columnGap="20px" rowGap="24px">
        <WatchCard /> 
        <WatchCard /> 
        <WatchCard /> 
        <WatchCard /> 
        <WatchCard /> 
        <WatchCard /> 
        <WatchCard /> 
        <WatchCard /> 
        <WatchCard /> 
        <WatchCard /> 
        <WatchCard /> 
        <WatchCard /> 
        <WatchCard /> 
        <WatchCard /> 
        <WatchCard /> 
      </Flex>
  </Flex>
  )
};

export default CollectionList;