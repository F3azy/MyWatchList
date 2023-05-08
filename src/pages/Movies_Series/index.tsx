import { Flex, HStack, Text, Select } from '@chakra-ui/react';
import WatchCard from '../../components/WatchCard';

const Movies_Series = ({title}: {title: string}) => {

  const genres: Array<string> = [
    "Anime",
    "Action",
    "Animation",
    "Comedy",
    "Criminal",
    "Children",
    "Document",
    "Fantasy",
    "Horror",
    "Romantic Comedy",
    "Science Fiction",
    "Sport",
    "Thriller",
  ];

  return (
    <Flex direction="column" rowGap="28px">
      <HStack columnGap="16px">
        <Text fontSize="32px" fontWeight="bold">
          {title}
        </Text>
        <Select w="200px" variant="base" defaultValue={genres[0]}>
            {genres.map((genre) => 
              <option key={genre} value={genre}>{genre}</option>
            )}
        </Select>
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