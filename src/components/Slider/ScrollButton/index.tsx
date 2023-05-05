import React, { useEffect } from 'react';
import { Box, Icon } from '@chakra-ui/react';
import { ScrollButtonProps } from './ScrollButtonProps';

const ScrollButton = ({as, direction, showButton, slider, sliderWidth, currentPage, setCurrentPage} : ScrollButtonProps) => {

  function changePage(): void {
    (direction == "left") ? setCurrentPage(prev => --prev) : setCurrentPage(prev => ++prev);
  }

  function applyTransform(trans: number): void {
    if(slider.current) {
      slider.current.style.transform = `translate(${trans}px)`;
      slider.current.style.transition = "transform 300ms ease 0s";
    }

    setTimeout(() => {
      if(slider.current) {
        slider.current.style.transition = "";
      }
    }, 300);
  }

  function move(): void {    
    let nextTransform: number = (direction=="left") ? -((sliderWidth as number)+20)*(currentPage-1) : -((sliderWidth as number)+20)*(currentPage+1);
    changePage();
    applyTransform(nextTransform);
  }

  useEffect (() => {
    let nextTransform: number = -((sliderWidth as number)+20)*(currentPage);
    applyTransform(nextTransform);

  }, [sliderWidth]);

  return (
    <Box
      visibility={showButton ? "visible" : "hidden"}
      w={"80px"} 
      h={"100%"}
      position={"absolute"}
      left={(direction == "left") ? "-20" : "auto"}
      right={(direction == "right") ? "-20" : "auto"} 
    >
      <Box 
        w={"60px"} 
        h={"100%"} 
        display={'flex'} 
        justifyContent={"center"} 
        alignItems={"center"} 
        bg={"#1f1f1f"} 
        position={"absolute"} 
        right={(direction == "right") ? "0" : "auto"}
        left={(direction == "left") ? "0" : "auto"}
        boxShadow={"0 0 10px 10px #1f1f1f"}
        opacity={0.5}
        _hover={{
          cursor: "pointer",
          bg: "#131313",
          boxShadow: "0 0 10px 10px #131313"
        }}
        zIndex={10}
        onClick={showButton ? move : undefined}
      >
          <Icon as={as} boxSize={10} />
      </Box>
    </Box>
  )
};

export default ScrollButton;