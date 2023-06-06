import React, { useEffect, useState } from 'react';
import { Flex, Text, Grid, GridItem } from '@chakra-ui/react';
import WatchCard from '../../components/WatchCard';
import { useLocation, useParams } from 'react-router-dom';
import { collections, collectionsList } from './collectionsArray';
import { Movie } from '../../types/common';

const CollectionList = () => {
  const { name } = useParams();

  const location = useLocation();

  const url = "https://api.themoviedb.org/3/";
  const [watchCards, setWatchCards] = useState<Movie[]>(() => {return []});

  useEffect(() => {
    setWatchCards([]);

    const fetching = async (type: string, id: number, title: string, index?: number) => { 
      try {
        const response  = await fetch(url+type+`/${id}?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US`);
        const json = await response.json();

        return json;
        // const timer = setTimeout(() => setIsLoading(false), 1000);
        // return () => clearTimeout(timer);
      }
      catch (error) {
        console.error(`Error fetching for (${title}):`, error);
        // const timer = setTimeout(() => setIsLoading(false), 1000);
        // return () => clearTimeout(timer);
      }
    }

    const watchCardsArray = collections[name as keyof collectionsList].watchCards;
    if (watchCardsArray && watchCardsArray.length > 0) {
      const fetchPromises = watchCardsArray.map((watchcard) => fetching(watchcard.type, watchcard.id, watchcard.title));

      Promise.all(fetchPromises)
        .then((fetchedData) => {
          setWatchCards(fetchedData);
        })
        .catch((error) => {
          console.error('Error fetching watch cards:', error);
        });
    }
  }, [location]);

  return (
    <Flex w="100%" direction="column" rowGap="28px">
      <Text fontSize="32px" fontWeight="bold">
        {collections[name as keyof collectionsList].name}
      </Text>
      <Grid w="100%" templateColumns='repeat(6, 1fr)' gap={6}>
          {watchCards?.map((watchcard, idx) => 
          <GridItem w='100%' key={watchcard.id}>
            <WatchCard 
            isLink={true}
            givenWidth='100%' 
            id={watchcard?.id} 
            type={collections[name as keyof collectionsList]?.watchCards[idx]?.type} 
            title={watchcard?.name ? watchcard?.name : watchcard?.title as string}
            SpecImageURL={watchcard?.poster_path as string}
            />
          </GridItem>
          )}
      </Grid>
    </Flex>
  )
};

export default CollectionList;