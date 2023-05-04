import React from 'react';
import { Box, Icon } from '@chakra-ui/react';
import { ComponentWithAs } from '@chakra-ui/react';

const ScrollButton = ({as, direction} : {as: ComponentWithAs<"svg">, direction?: string}) => {

  function move(event: React.MouseEvent<HTMLElement>) {
    const slider: HTMLElement  = event.currentTarget.parentElement?.querySelector("#slider") as HTMLElement;
    
    const currentTransform: string = slider.style.transform;
    const regex: RegExp = /translate\((-?\d+)px\)/;
    const match: RegExpMatchArray = currentTransform.match(regex) as RegExpMatchArray;

    if (match) {
      const num = parseInt(match[1]);

      if(!(num == 0 && direction == "left") && !(num == -3526 && direction == "right")) {

        slider.style.transform = (direction=="left") ? `translate(${num+slider.offsetWidth+20}px)` : `translate(${num-slider.offsetWidth-20}px)`;
        slider.style.transition = "transform 300ms ease 0s";
    
        setTimeout(() => {
          slider.style.transition = "";
        }, 300);
      }
    }
  }

  return (
    <Box 
        borderLeftRadius={(direction == "right") ? "4px" : "0"}
        borderRightRadius={(direction == "left") ? "4px" : "0"}
        w={"60px"} 
        minH={"100%"} 
        display={'flex'} 
        justifyContent={"center"} 
        alignItems={"center"} 
        bg={"blackAlpha.700"} 
        position={"absolute"} 
        left={(direction == "left") ? "-20" : "auto"}
        right={(direction == "right") ? "-20" : "auto"}
        _hover={{
        cursor: "pointer",
        bg: "blackAlpha.900",
        }}
        zIndex={10}
        onClick={move}
    >
        <Icon as={as} boxSize={10} />
    </Box>
  )
};

export default ScrollButton;