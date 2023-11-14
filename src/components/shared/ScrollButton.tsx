import React, { useEffect, useState, useRef } from 'react';
import { Box, Icon } from '@chakra-ui/react';
import useInterval from '../../hooks/useInterval';
import { ComponentWithAs } from '@chakra-ui/react';

type ScrollButtonProps = {
    as: ComponentWithAs<"svg">, 
    direction: string, 
    showButton: boolean,
    carousel: React.RefObject<HTMLDivElement>,
    carouselWidth: number | undefined,
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>, 
    id?: string,
    animate?: boolean,
    pages?: number,
    isloading?: boolean,
};

const ScrollButton = ({as, direction, showButton, carousel, carouselWidth, currentPage, setCurrentPage, id, animate, pages, isloading}: ScrollButtonProps) => {

  const [clicked, setClicked] = useState(false);
  const currentPageRef = useRef(currentPage);

  function changePage(): void {
    (direction == "left") ? setCurrentPage(prev => --prev) : setCurrentPage(prev => ++prev);
  }

  function applyTransform(trans: number, time: number): () => void {
    if(carousel.current) {
      carousel.current.style.transform = `translate(${trans}px)`;
      carousel.current.style.transition = `transform ${time}ms ease-in-out`;
    }

    const timer = setTimeout(() => {
      if(carousel.current) {
        carousel.current.style.transition = "";
        setClicked(false);
      }
    }, time);

    return () => clearTimeout(timer);
  }

  function countAndTransform(time: number, page: number): void {
    let nextTransform: number = -((carouselWidth as number))*(page);
    applyTransform(nextTransform, time);
  }

  function move(): void {    
    setClicked(true);
    countAndTransform(1000, (direction=="left") ? (currentPage-1) : (currentPage+1));
    changePage();
  }

  useEffect(() => {
    countAndTransform(800, currentPage);
  }, [carouselWidth]);

  useEffect(() => {
    setCurrentPage(0);
    countAndTransform(800, 0);
  }, [id]);

  useInterval(() => {
    if(animate) {
    if(currentPage!==Math.ceil(pages as number-1)) { 
      move();
    }
    else {
      setCurrentPage(0);
      countAndTransform(Math.ceil(pages as number)==2 ? 1000 : 3000, 0);
    }
    }
  }, (!clicked && !isloading)? 5000 : null);

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