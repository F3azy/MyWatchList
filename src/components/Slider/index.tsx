import React, { useEffect, useState } from 'react';
import WatchCard from './WatchCard';
import { Flex, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import ScrollButton from './ScrollButton';

const Slider = () => {

  const [showLeftButton, setLeftShowButton] = useState(() => {return false});
  const [showRightButton, setRightShowButton] = useState(() => {return true});
  const [transform, setTransform] = useState(() => {return 0});

  useEffect(() => {
    (transform == 0) ? setLeftShowButton(false) : setLeftShowButton(true);
    (transform == -3526) ? setRightShowButton(false) : setRightShowButton(true);
    
  }, [transform]);

  return (
    <Flex direction={"column"} rowGap={"8px"}>
      <Text fontSize={"24px"} fontWeight={"bold"}>
        Marvel
      </Text>
      <Flex position={"relative"} align={"center"} >
        <ScrollButton 
          as={ChevronLeftIcon} 
          direction="left" 
          setTransform={setTransform} 
          showButton={showLeftButton} 
        />
        <Flex id={"slider"} columnGap={"20px"} style={{transform: "translate(0px)"}}>
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
          setTransform={setTransform} 
          showButton={showRightButton} 
        />
      </Flex>
    </Flex>
  )
};

export default Slider;