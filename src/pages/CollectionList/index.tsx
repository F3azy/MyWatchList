import React, { useEffect, useState } from 'react';
import { Flex, HStack, Text } from '@chakra-ui/react';
import WatchCard from '../../components/WatchCard';
import { useParams } from 'react-router-dom';

interface watchCardInfo {
  title: string,
  type: string,
}

interface collectionsInfo {
  name: string,
  watchCards: watchCardInfo[],
}

interface collectionsList {
  Marvel: collectionsInfo,
  // HarryPotter?: collectionsInfo,
  // StarWars?: collectionsInfo,
  // LordoftheRings?: collectionsInfo,
  // PiratesOfCaribbean?: collectionsInfo,
  // Twilight?: collectionsInfo,
}

const collections: collectionsList = {
  Marvel: {
    name: "Marvel",
    watchCards: [
      {
        title: "Captain America: The First Avenger",
        type: "movie",
      },
      {
        title: "Marvel's Agent Carter",
        type: "tv",
      },
      {
        title: "Captain Marvel",
        type: "movie",
      },
      {
        title: "Iron Man",
        type: "movie",
      },
      {
        title: "Iron Man 2",
        type: "movie",
      },
      {
        title: "The Incredible Hulk",
        type: "movie",
      },
      {
        title: "Thor",
        type: "movie",
      },
      {
        title: "The Avengers",
        type: "movie",
      },
      {
        title: "Iron Man 3",
        type: "movie",
      },
      {
        title: "Marvel's Agents of S.H.I.E.L.D.",
        type: "tv",
      },
      {
        title: "Thor: The Dark World",
        type: "movie",
      },
      {
        title: "Captain America: The Winter Soldier",
        type: "movie",
      },
      {
        title: "Guardians of the Galaxy",
        type: "movie",
      },
      {
        title: "Guardians of the Galaxy Vol. 2",
        type: "movie",
      },
      {
        title: "Avengers: Age of Ultron",
        type: "movie",
      },
      {
        title: "Ant-Man",
        type: "movie",
      },
      {
        title: "Captain America: Civil War",
        type: "movie",
      },
      {
        title: "Black Widow",
        type: "movie",
      },
      {
        title: "Doctor Strange",
        type: "movie",
      },
      {
        title: "Black Panther",
        type: "movie",
      },
      {
        title: "Spider-Man: Homecoming",
        type: "movie",
      },
      {
        title: "Thor: Ragnarok",
        type: "movie",
      },
      {
        title: "Ant-Man and the Wasp",
        type: "movie",
      },
      {
        title: "Avengers: Infinity War",
        type: "movie",
      },
      {
        title: "Avengers: Endgame",
        type: "movie",
      },
      {
        title: "Loki",
        type: "tv",
      },
      {
        title: "What If...?",
        type: "tv",
      },
      {
        title: "WandaVision",
        type: "tv",
      },
      {
        title: "The Falcon and the Winter Soldier",
        type: "tv",
      },
      {
        title: "Shang-Chi and the Legend of the Ten Rings",
        type: "movie",
      },
      {
        title: "Eternals",
        type: "movie",
      },
      {
        title: "Spider-Man: Far From Home",
        type: "movie",
      },
      {
        title: "Spider-Man: No Way Home",
        type: "movie",
      },
      {
        title: "Doctor Strange in the Multiverse of Madness",
        type: "movie",
      },
      {
        title: "Hawkeye",
        type: "tv",
      },
      {
        title: "Moon Knight",
        type: "tv",
      },
      {
        title: "She-Hulk: Attorney at Law",
        type: "tv",
      },
      {
        title: "Ms. Marvel",
        type: "tv",
      },
      {
        title: "Thor: Love and Thunder",
        type: "movie",
      },
      {
        title: "Black Panther: Wakanda Forever",
        type: "movie",
      },
      {
        title: "Ant-Man and the Wasp: Quantumania",
        type: "movie",
      },
      {
        title: "Guardians of the Galaxy Vol. 3",
        type: "movie",
      },
    ]
  }
};

const CollectionList = () => {
  const { name } = useParams();
  const [url, setUrl] = useState(() => {return "https://api.themoviedb.org/3/search/"});
  const [watchCards, setWatchCards] = useState<any>(() => {return []});
  const [loading, setLoading] = useState(() => {return true});

  useEffect(() => {
    setLoading(true);
    
    const fetchData = async () => {
      const promises = collections[name as keyof collectionsList].watchCards.map( async (watchcard) => {
        const response = await fetch(url+watchcard.type+`?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&query=${watchcard.title}`);
        const json = await response.json();
  
        return json;
      });
      const fetchedData = await Promise.all(promises);

      setWatchCards(fetchedData.map((movie: any, idx: number) =>  movie.results.filter((m: any) => m.name ? m.name==collections[name as keyof collectionsList].watchCards[idx].title : m.title==collections[name as keyof collectionsList].watchCards[idx].title)[0]));
      setLoading(false);
    }
    
    fetchData();
  }, []);

  return (
    <Flex w="100%" direction="column" rowGap="28px">
    <HStack columnGap="16px">
      <Text fontSize="32px" fontWeight="bold">
        {name}
      </Text>
    </HStack>
    <Flex w="100%" wrap="wrap" columnGap="20px" rowGap="24px">
        {loading ? null : watchCards?.map((watchcard: any) => <WatchCard key={watchcard.name ? watchcard.name : watchcard.title} src={watchcard.poster_path} />)}
        {/* <WatchCard /> 
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
        <WatchCard />  */}
      </Flex>
  </Flex>
  )
};

export default CollectionList;