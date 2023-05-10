import React from 'react';
import { Flex } from '@chakra-ui/react';
import TitleInput from '../../components/TitleInput';
import WatchCard from '../../components/WatchCard';

const Search = () => {
  return (
    <Flex w="100%" direction="column" rowGap="28px">
      <TitleInput />
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

export default Search;