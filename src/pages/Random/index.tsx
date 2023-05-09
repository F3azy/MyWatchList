import { Flex, HStack, Text, Select, Button } from '@chakra-ui/react';
import { useState } from 'react';
import MovieSelect from '../../components/MovieSelect';
import WatchCard from '../../components/WatchCard';

const Random = () => {
  const [type, setType] = useState(() => {return ""});
  const [genre, setGenre] = useState(() => {return ""});

  function changeType(event: React.ChangeEvent<HTMLSelectElement>) {
    setType(event.currentTarget.value);
  }

  function changeGenre(event: React.ChangeEvent<HTMLSelectElement>) {
    setGenre(event.currentTarget.value);
  }

  return (
    <Flex w="100%" flex={1} direction="column" rowGap="28px">
      <HStack columnGap="16px">
        <Text fontSize="32px" fontWeight="bold">
          Search a random {genre} {type}
        </Text>
        <MovieSelect SelectInfoArray="types" setStateFun={setType} changeFun={changeType} />
        <MovieSelect SelectInfoArray="genres" setStateFun={setGenre} changeFun={changeGenre} />
        <Button variant="full" borderRadius="full">Search</Button>
      </HStack>
      <Flex w="100%" flex={1} justify={"center"} align={"center"}>
            <WatchCard givenWidth='65%' />
      </Flex>
    </Flex>
  )
};

export default Random;