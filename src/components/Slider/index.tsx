import React, { useEffect, useState, useRef, useLayoutEffect, useMemo } from 'react';
import WatchCard from '../WatchCard';
import { Flex, Text, SkeletonText } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import ScrollButton from './ScrollButton';
import { Movie } from '../../types/common';


const Slider = ({sliderTitle, sliderUrl, sliderType}: {sliderTitle: string, sliderUrl: string, sliderType?: string}) => {

  const url = "https://api.themoviedb.org/3/";
  const [watchCards, setWatchCards] = useState<Movie[]>(() => {return []});
  const [length, setLength] = useState(() => {return 0});
  const [isloading, setIsLoading] = useState(() => {return true});

  const [showLeftButton, setLeftShowButton] = useState(() => {return false});
  const [showRightButton, setRightShowButton] = useState(() => {return true});
  const [page, setPage] = useState(() => {return 0});
  const sliderRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | undefined>(() => {return undefined});

  useEffect(() => {
    setIsLoading(true);
    const fetching = async () => { 
      try {
        const response  = await fetch(url+(sliderType ? sliderType : "")+sliderUrl+`?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US`);
        const json = await response.json();
        
        setWatchCards(json.results);
        setLength(Math.ceil(json.results.length/5));
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
      }
      catch (error) {
        console.error(`Error fetching for slider (${sliderTitle}):`, error);
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
      }
    }

    fetching();
  }, []);

  useLayoutEffect (() => {
    function handleResize(): void {
      if (sliderRef.current) {
        setWidth(sliderRef.current?.offsetWidth/(length)-16)
      } 
    }
    
    window.addEventListener("resize", handleResize);
    
    const timer = setTimeout(() => { handleResize(); }, 500);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };

  }, [length]);

  useEffect(() => {
    (page == 0) ? setTimeout(() => { setLeftShowButton(false) }, 1000) : setLeftShowButton(true);
    (page == (length-1)) ? setTimeout(() => {setRightShowButton(false) }, 1000) : setRightShowButton(true);
  }, [page]);

  const showWatchCards = useMemo(() => 
    watchCards.map((watchcard) => 
    <WatchCard 
    key={watchcard.id} 
    givenHeight='494px' 
    id={watchcard.id} 
    type={sliderType ? sliderType : watchcard.media_type as string}
    title={watchcard?.name ? watchcard?.name : watchcard?.title as string}
    SpecImageURL={watchcard?.poster_path as string}
    />
  ), [watchCards]);

  return (
    <Flex minW="100%" direction="column" rowGap="8px">
      <SkeletonText 
        skeletonHeight='36px' 
        noOfLines={1} 
        isLoaded={!isloading}
        startColor='brand.primary' 
        endColor='brand.tertiary'
        fadeDuration={3} 
        >  
        <Text fontSize="24px" fontWeight="bold">
          {sliderTitle}
        </Text>
      </SkeletonText>
      <Flex position="relative" align="center" >
        <ScrollButton 
          as={ChevronLeftIcon} 
          direction="left" 
          showButton={showLeftButton} 
          slider={sliderRef}
          sliderWidth={width}
          currentPage={page}
          setCurrentPage={setPage}
        />
        <Flex minW={`calc(${100*length}% + ${20*(length-1)}px)`} ref={sliderRef} columnGap="20px" style={{transform: "translate(0px)"}}>
        {showWatchCards}
        </Flex>
        <ScrollButton 
          as={ChevronRightIcon} 
          direction="right" 
          showButton={showRightButton} 
          slider={sliderRef}
          sliderWidth={width}
          currentPage={page}
          setCurrentPage={setPage}
        />
      </Flex>
    </Flex>
  )
};

export default Slider;