import React, { useEffect, useState } from 'react';
import { Box, Icon } from '@chakra-ui/react';
import { ScrollButtonProps } from './ScrollButtonProps';

const ScrollButton = ({as, direction, showButton, slider, sliderWidth, currentPage, setCurrentPage, id}: ScrollButtonProps) => {

  const [clicked, setClicked] = useState(() => {return false});

  function changePage(): void {
    (direction == "left") ? setCurrentPage(prev => --prev) : setCurrentPage(prev => ++prev);
  }

  function applyTransform(trans: number, time: number): void {
    if(slider.current) {
      slider.current.style.transform = `translate(${trans}px)`;
      slider.current.style.transition = `transform ${time}ms ease-in-out`;
    }

    setTimeout(() => {
      if(slider.current) {
        slider.current.style.transition = "";
        setClicked(false);
      }
    }, time);
  }

  function move(): void {    
    setClicked(true);
    let nextTransform: number = (direction=="left") ? -((sliderWidth as number))*(currentPage-1) : -((sliderWidth as number))*(currentPage+1);
    changePage();
    applyTransform(nextTransform, 1000);
  }

  function conditionalMove(time: number, page: number): void {
    let nextTransform: number = -((sliderWidth as number))*(page);
    applyTransform(nextTransform, time);
  }

  useEffect (() => {
    conditionalMove(800, currentPage);
  }, [sliderWidth]);

  useEffect(() => {
    setCurrentPage(0);
    conditionalMove(800, 0);
  }, [id]);

  return (
    <Box
      visibility={showButton ? "visible" : "hidden"}
      w="80px" 
      h="100%"
      position="absolute"
      left={(direction == "left") ? "-20" : "auto"}
      right={(direction == "right") ? "-20" : "auto"} 
    >
      <Box 
        w="60px" 
        h="100%"
        display='flex'
        justifyContent="center"
        alignItems="center" 
        bg="#1f1f1f" 
        position="absolute" 
        zIndex={9}
        boxShadow="0 0 10px 10px #1f1f1f"
        right={(direction == "right") ? "0" : "auto"}
        left={(direction == "left") ? "0" : "auto"}
        opacity={0.5}
        _hover={{
          cursor: "pointer",
          bg: "#131313",
          boxShadow: "0 0 10px 10px #131313"
        }}
        onClick={(showButton && !clicked) ? move : undefined}
      >
          <Icon as={as} boxSize={10} />
      </Box>
    </Box>
  )
};

export default ScrollButton;