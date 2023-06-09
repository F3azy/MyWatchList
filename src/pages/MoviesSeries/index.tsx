import { Flex, HStack, Text, Grid, GridItem, SkeletonText } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import WatchCard from '../../components/WatchCard';
import MovieSelect from '../../components/MovieSelect';
import { Movie } from '../../types/common';
import { useLocation } from 'react-router-dom';

const MoviesSeries = ({type}: {type: string}) => {

  const location = useLocation();

  const url = "https://api.themoviedb.org/3/discover/";
  const [genre, setGenre] = useState(() => {return ""});
  const [watchCards, setWatchCards] = useState<Movie[]>(() => {return []});
  const [isloading, setIsLoading] = useState(() => {return true});
  
  function changeGenre(event: React.ChangeEvent<HTMLSelectElement>) {
    setGenre(event.currentTarget.value);
  }

  useEffect(() => {
    fetch(url+(type=="tv" ? "tv" : "movie")+`?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US&with_genres=${genre}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(movie => {
      setWatchCards(movie.results.filter((m: Movie) => (m.poster_path != null))) 
      })
      .catch(error => {
        console.error('Error fetching movies or series data:', error);
      })
  }, [genre, location]);

  return (
    <Flex w="100%" direction="column" rowGap="28px">
      <HStack columnGap="16px">
        <SkeletonText 
        skeletonHeight='48px' 
        noOfLines={1} 
        isLoaded={!isloading}
        startColor='brand.primary' 
        endColor='brand.tertiary'
        fadeDuration={3} 
        >
          <Text fontSize="32px" fontWeight="bold">
            {type=="tv" ? "Series" : "Movies"}
          </Text>
        </SkeletonText>
        <MovieSelect isloading={isloading} setIsLoading={setIsLoading} type={type} setStateFun={setGenre} changeFun={changeGenre} />
      </HStack>
      <Grid w="100%" templateColumns='repeat(8, 1fr)' gap={6}>
        {watchCards.map((watchcard) => 
          <GridItem w='100%' key={watchcard.id}>
            <WatchCard 
            isLink={true}
            givenWidth='100%' 
            id={watchcard.id} 
            type={type.toLocaleLowerCase()=="series" ? "tv" : "movie"}
            title={watchcard?.name ? watchcard?.name : watchcard?.title as string}
            SpecImageURL={watchcard?.poster_path as string}
            />
          </GridItem>
        )}
      </Grid>
    </Flex>
  )
};

export default MoviesSeries;