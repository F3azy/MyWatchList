import { Flex, HStack, Text, Select } from '@chakra-ui/react';
import { useState } from 'react';
import WatchCard from '../../components/WatchCard';
import MovieSelect from '../../components/MovieSelect';

const Movies_Series = ({type}: {type: string}) => {

  const [genre, setGenre] = useState(() => {return ""});

  function changeGenre(event: React.ChangeEvent<HTMLSelectElement>) {
    setGenre(event.currentTarget.value);
  }

  return (
    <Flex direction="column" rowGap="28px">
      <HStack columnGap="16px">
        <Text fontSize="32px" fontWeight="bold">
          {type}
        </Text>
        <MovieSelect SelectInfoArray="genres" setStateFun={setGenre} changeFun={changeGenre} />
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

export default Movies_Series;