import React, { useEffect, useState } from 'react';
import { Flex, Text, Grid, GridItem } from '@chakra-ui/react';
import WatchCard from '../../components/WatchCard';
import { useParams } from 'react-router-dom';
import { collections, collectionsList } from './collectionsArray';
import { Movie } from '../../types/common';

const CollectionList = () => {
  const { name } = useParams();

  const url = "https://api.themoviedb.org/3/";
  const [WatchCards, setWatchCards] = useState<Movie[]>(() => {return []});

  useEffect(() => {
    setWatchCards([]);
    collections[name as keyof collectionsList]?.watchCards.forEach((watchcard) => {
      fetch(url+watchcard.type+`/${watchcard.id}?api_key=${import.meta.env.VITE_MOVIE_API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json()
      })
      .then(movie => {
        setWatchCards(prev => [...prev, movie]) 
        })
        .catch(error => {
          console.error('Error fetching collection data:', error);
        })
    });
  }, []);

  return (
    <Flex w="100%" direction="column" rowGap="28px">
      <Text fontSize="32px" fontWeight="bold">
        {collections[name as keyof collectionsList].name}
      </Text>
      <Grid w="100%" templateColumns='repeat(6, 1fr)' gap={6}>
          {WatchCards?.map((watchcard, idx) => 
          <GridItem w='100%' key={watchcard.id}>
            <WatchCard 
            givenWidth='100%' 
            id={watchcard.id} 
            type={collections[name as keyof collectionsList]?.watchCards[idx]?.type} 
            title={watchcard?.name ? watchcard?.name : watchcard?.title as string}
            SpecImageURL={watchcard?.poster_path}
            />
          </GridItem>
          )}
      </Grid>
    </Flex>
  )
};

export default CollectionList;