import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import WatchCard from '../WatchCard';
import { Flex, Text, SkeletonText } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import ScrollButton from './ScrollButton';


const Slider = ({sliderTitle, sliderUrl, sliderType}: {sliderTitle: string, sliderUrl: string, sliderType?: string}) => {

  const [url, setUrl] = useState(() => {return "https://api.themoviedb.org/3/"});
  const [watchCards, setWatchCards] = useState<any[]>(() => {return []});
  const [length, setLength] = useState(() => {return 0});
  const [isloading, setIsLoading] = useState(() => {return true});

  useEffect(() => {
    setIsLoading(true);
    const fetching = async () => { 
      const response  = await fetch(url+(sliderType ? sliderType : "")+sliderUrl+`?api_key=${import.meta.env.VITE_MOVIE_API_KEY}`);
      const json = await response.json();

      setWatchCards(json.results);
      setLength(Math.ceil(json.results.length/5));
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }

    fetching();
  }, []);

  const [showLeftButton, setLeftShowButton] = useState(() => {return false});
  const [showRightButton, setRightShowButton] = useState(() => {return true});
  const [page, setPage] = useState(() => {return 0});
  const sliderRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | undefined>(undefined);

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
    (page == 0) ?  setTimeout(() => { setLeftShowButton(false) }, 1000) : setLeftShowButton(true);
    (page == (length-1)) ?  setTimeout(() => {setRightShowButton(false) }, 1000) : setRightShowButton(true);
  }, [page]);

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
        {watchCards.map((watchcard: any) => 
            <WatchCard key={watchcard.id} givenHeight='494px' id={watchcard.id} type={sliderType ? sliderType : watchcard.media_type}/>
        )}
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