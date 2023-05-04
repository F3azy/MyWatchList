import React from 'react';
import { Box, Icon } from '@chakra-ui/react';
import { ScrollButtonProps } from './ScrollButtonProps';

const ScrollButton = ({as, direction, setTransform, showButton} : ScrollButtonProps) => {

  function move(event: React.MouseEvent<HTMLElement>) {
    const slider: HTMLElement  = event.currentTarget.parentElement?.parentElement?.querySelector("#slider") as HTMLElement;
    
    const currentTransform: string = slider.style.transform;
    const regex: RegExp = /translate\((-?\d+)px\)/;
    const match: RegExpMatchArray = currentTransform.match(regex) as RegExpMatchArray;

    if (match) {
      const num = parseInt(match[1]);

      if(!(num == 0 && direction == "left") && !(num == -3526 && direction == "right")) {

        const nextTransform: number = (direction=="left") ? num+slider.offsetWidth+20 : num-slider.offsetWidth-20;

        setTransform(nextTransform);

        slider.style.transform = `translate(${nextTransform}px)`;
        slider.style.transition = "transform 300ms ease 0s";
    
        setTimeout(() => {
          slider.style.transition = "";
        }, 300);
      }
    }
  }

  return (
    <Box
    visibility={showButton ? "visible" : "hidden"}
    w={"80px"} 
    h={"100%"}
    position={"absolute"}
    left={(direction == "left") ? "-20" : "auto"}
    right={(direction == "right") ? "-20" : "auto"} 
    zIndex={9}
    >
      <Box 
          borderLeftRadius={(direction == "right") ? "4px" : "0"}
          borderRightRadius={(direction == "left") ? "4px" : "0"}
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
          onClick={move}
          >
          <Icon as={as} boxSize={10} />
      </Box>
    </Box>
  )
};

export default ScrollButton;