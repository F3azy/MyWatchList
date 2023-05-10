import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import WatchCard from '../WatchCard';
import { Flex, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import ScrollButton from './ScrollButton';

const Slider = () => {

  const [showLeftButton, setLeftShowButton] = useState(() => {return false});
  const [showRightButton, setRightShowButton] = useState(() => {return true});
  const [page, setPage] = useState(() => {return 0});
  const sliderRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | undefined>(undefined);

  useLayoutEffect (() => {
    function handleResize(): void {
      if (sliderRef.current) {
        setWidth(sliderRef.current?.offsetWidth/3-16)
      } 
    }
    
    window.addEventListener("resize", handleResize);
    
    setTimeout(() => { handleResize(); }, 500);

    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, []);

  useEffect(() => {
    (page == 0) ? setLeftShowButton(false) : setLeftShowButton(true);
    (page == 2) ? setRightShowButton(false) : setRightShowButton(true);
  }, [page]);

  return (
    <Flex minW="100%" direction="column" rowGap="8px">
      <Text fontSize="24px" fontWeight="bold">
        Marvel
      </Text>
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
        <Flex minW={`calc(300% + ${20*2}px)`} ref={sliderRef} columnGap="20px" style={{transform: "translate(0px)"}}>
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