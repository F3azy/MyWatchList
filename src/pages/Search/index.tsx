import React, { useEffect, useState } from 'react';
import { Flex, Grid, GridItem } from '@chakra-ui/react';
import TitleInput from '../../components/TitleInput';
import WatchCard from '../../components/WatchCard';

const Search = () => {

  const [url, setUrl] = useState(() => {return "https://api.themoviedb.org/3/search/"});
  const [title, setTitle] = useState(() => {return ""});
  const [watchCards, setWatchCards] = useState<any>(() => {return []});

  useEffect(() => {
    fetch(url+"multi"+`?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&query=${title}`)
    .then(response => {return response.json()})
    .then(movie => {
      console.log(movie)
      setWatchCards(movie.results.filter((m: any) => m.media_type != "person")) 
      })
  }, [title]);

  console.log(watchCards);

  return (
    <Flex w="100%" direction="column" rowGap="28px">
      <TitleInput setTitle={setTitle} />
      <Grid w="100%" templateColumns='repeat(8, 1fr)' gap={6}>
        {watchCards.map((watchcard: any) => 
          <GridItem w='100%' key={watchcard.id}>
            <WatchCard givenWidth='100%' id={watchcard.id} type={watchcard.media_type}/>
          </GridItem>
        )}
      </Grid>
    </Flex>
  )
};

export default Search;