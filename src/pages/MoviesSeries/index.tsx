import { Flex, HStack, Text, Grid, GridItem, SkeletonText } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import WatchCard from '../../components/WatchCard';
import MovieSelect from '../../components/MovieSelect';

const MoviesSeries = ({type}: {type: string}) => {

  const [genre, setGenre] = useState(() => {return ""});
  const [url, setUrl] = useState(() => {return "https://api.themoviedb.org/3/discover/"});
  const [watchCards, setWatchCards] = useState<any>(() => {return []});
  const [isloading, setIsLoading] = useState(() => {return true});
  
    function changeGenre(event: React.ChangeEvent<HTMLSelectElement>) {
      setGenre(event.currentTarget.value);
    }

  useEffect(() => {
    fetch(url+(type.toLocaleLowerCase()=="series" ? "tv" : "movie")+`?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&with_genres=${genre}`)
    .then(response => {return response.json()})
    .then(movie => {
      setWatchCards(movie.results.filter((m: any) => (m.poster_path != null))) 
      })
  }, [genre]);

  return (
    <Flex w="100%" direction="column" rowGap="28px">
      <HStack columnGap="16px">
        <SkeletonText 
        fadeDuration={3} 
        startColor='brand.primary' 
        endColor='brand.tertiary'
        noOfLines={1} 
        skeletonHeight='48px' 
        isLoaded={!isloading}>
          <Text fontSize="32px" fontWeight="bold">
            {type}
          </Text>
        </SkeletonText>
        <MovieSelect isloading={isloading} setIsLoading={setIsLoading} type={type} setStateFun={setGenre} changeFun={changeGenre} />
      </HStack>
      <Grid w="100%" templateColumns='repeat(8, 1fr)' gap={6}>
        {watchCards.map((watchcard: any) => 
          <GridItem w='100%' key={watchcard.id}>
            <WatchCard givenWidth='100%' id={watchcard.id} type={type.toLocaleLowerCase()=="series" ? "tv" : "movie"}/>
          </GridItem>
        )}
      </Grid>
    </Flex>
  )
};

export default MoviesSeries;