import React from 'react';
import { Box, Icon } from '@chakra-ui/react';
import { ComponentWithAs } from '@chakra-ui/react';

const ScrollButton = ({as, direction} : {as: ComponentWithAs<"svg">, direction?: string}) => {

  function move(event: React.MouseEvent<HTMLElement>) {
    const slider: HTMLElement  = event.currentTarget.parentElement?.querySelector("#slider") as HTMLElement;
    
    slider.scrollBy({
      top: 0,
      left: (direction=="left") ? -slider.offsetWidth-20 : slider.offsetWidth+20,
      behavior: "smooth"
    });
  }

  return (
    <Box 
        borderLeftRadius={(direction == "right") ? "full" : "0"}
        borderRightRadius={(direction == "left") ? "full" : "0"}
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
        onClick={move}
    >
        <Icon as={as} boxSize={10} />
    </Box>
  )
};

export default ScrollButton;