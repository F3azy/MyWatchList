import { Flex, HStack, Text, Select, Button } from '@chakra-ui/react';
import { useState, useEffect, useMemo } from 'react';
import MovieSelect from '../../components/MovieSelect';
import WatchCard from '../../components/WatchCard';
import { Movie } from '../../types/common';

const Random = () => {
  const [type, setType] = useState(() => {return "movie"});
  const [genre, setGenre] = useState(() => {return ""});
  const [isloadingGenres, setIsLoadingGenres] = useState(() => {return true});
  const [watchCard, setWatchCard] = useState<Movie>();
  const url = "https://api.themoviedb.org/3/discover/";

  function changeType(event: React.ChangeEvent<HTMLSelectElement>) {
    setType(event.currentTarget.value);
  }

  function changeGenre(event: React.ChangeEvent<HTMLSelectElement>) {
    setGenre(event.currentTarget.value);
  }

  function searchRand() {
    const fetching = async () => {
      try {
        const randomPage = Math.floor(Math.random() * (500 - 1 + 1) + 1);
        const response = await fetch(url+type+`?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US&with_genres=${genre}&page=${randomPage}`);
        const json = await response.json();
        
        const randomMovie = Math.floor(Math.random() * 20);
        setWatchCard(json.results[randomMovie]);
      }
      catch (error) {
        console.error(`Error fetching for random mocie:`, error);
      }
    }
    fetching();
  }
  
  return (
    <Flex w="100%" flex={1} direction="column" rowGap={5}>
      <HStack columnGap="16px">
        <Text fontSize="32px" fontWeight="bold">
          Search a random
        </Text>
        <Select w="200px" variant="base" defaultValue="movie" onChange={changeType}>
          <option value="movie">Movie</option>
          <option value="tv">Series</option>
        </Select>
        <MovieSelect 
        isloading={isloadingGenres} 
        setIsLoading={setIsLoadingGenres} 
        type={type} 
        setStateFun={setGenre} 
        changeFun={changeGenre} 
        />
        <Button variant="full" borderRadius="full" onClick={searchRand}>Search</Button>
      </HStack>
      <Flex w="100%" flex={1} justify={"center"} align={"center"}>
        {watchCard ? 
        <WatchCard 
        isLink={true}
        givenWidth={watchCard.backdrop_path ? '70%' : '25%'}
        id={watchCard.id}
        type={type}
        title={watchCard.name ? watchCard.name : watchCard.title as string}
        SpecImageURL={watchCard.backdrop_path ? watchCard.backdrop_path : watchCard.poster_path as string}
        /> 
        : ""}
      </Flex>
    </Flex>
  )
};

export default Random;