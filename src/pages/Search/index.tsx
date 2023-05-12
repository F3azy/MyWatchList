import React from 'react';
import { Flex, Grid, GridItem } from '@chakra-ui/react';
import TitleInput from '../../components/TitleInput';
import WatchCard from '../../components/WatchCard';

const Search = () => {
  return (
    <Flex w="100%" direction="column" rowGap="28px">
      <TitleInput />
      <Grid w="100%" templateColumns='repeat(8, 1fr)' gap={6}>
        <GridItem w='100%'>
          <WatchCard givenWidth='100%'/>
        </GridItem>
        <GridItem w='100%'>
          <WatchCard givenWidth='100%'/>
        </GridItem>
        <GridItem w='100%'>
          <WatchCard givenWidth='100%'/>
        </GridItem>
        <GridItem w='100%'>
          <WatchCard givenWidth='100%'/>
        </GridItem>
        <GridItem w='100%'>
          <WatchCard givenWidth='100%'/>
        </GridItem>
        <GridItem w='100%'>
          <WatchCard givenWidth='100%'/>
        </GridItem>
        <GridItem w='100%'>
          <WatchCard givenWidth='100%'/>
        </GridItem>
        <GridItem w='100%'>
          <WatchCard givenWidth='100%'/>
        </GridItem>
        <GridItem w='100%'>
          <WatchCard givenWidth='100%'/>
        </GridItem>
        <GridItem w='100%'>
          <WatchCard givenWidth='100%'/>
        </GridItem>
        <GridItem w='100%'>
          <WatchCard givenWidth='100%'/>
        </GridItem>
        <GridItem w='100%'>
          <WatchCard givenWidth='100%'/>
        </GridItem>
        <GridItem w='100%'>
          <WatchCard givenWidth='100%'/>
        </GridItem>
      </Grid>
    </Flex>
  )
};

export default Search;