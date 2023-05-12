import { Flex, HStack, Text, Grid, GridItem } from '@chakra-ui/react';
import { useState } from 'react';
import WatchCard from '../../components/WatchCard';
import MovieSelect from '../../components/MovieSelect';

const MoviesSeries = ({type}: {type: string}) => {

  const [genre, setGenre] = useState(() => {return ""});

  function changeGenre(event: React.ChangeEvent<HTMLSelectElement>) {
    setGenre(event.currentTarget.value);
  }

  return (
    <Flex w="100%" direction="column" rowGap="28px">
      <HStack columnGap="16px">
        <Text fontSize="32px" fontWeight="bold">
          {type}
        </Text>
        <MovieSelect SelectInfoArray="genres" setStateFun={setGenre} changeFun={changeGenre} />
      </HStack>
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

export default MoviesSeries;