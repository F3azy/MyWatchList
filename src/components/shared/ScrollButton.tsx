import { Box, Icon } from '@chakra-ui/react';
import { ComponentWithAs } from '@chakra-ui/react';

type ScrollButtonProps = {
    as: ComponentWithAs<"svg">, 
    direction: string, 
    showButton: boolean,
    onClick: () => void
};

const ScrollButton = ({as, direction, showButton, onClick}: ScrollButtonProps) => {
  return (
    <Box
      visibility={showButton ? "visible" : "hidden"}
      w="80px" 
      h="full"
      zIndex={9}
      position="absolute"
      top={0}
      left={(direction == "left") ? "-20" : "auto"}
      right={(direction == "right") ? "-20" : "auto"} 
    >
      <Box 
        w="60px" 
        h="full"
        display='flex'
        justifyContent="center"
        alignItems="center" 
        bg="#1f1f1f" 
        position="absolute" 

        boxShadow="0 0 10px 15px #1f1f1f"
        right={(direction == "right") ? "0" : "auto"}
        left={(direction == "left") ? "0" : "auto"}
        opacity={0.7}
        _hover={{
          cursor: "pointer",
          bg: "#131313",
          boxShadow: "0 0 10px 15px #131313"
        }}
        onClick={onClick}
      >
          <Icon as={as} boxSize={10} />
      </Box>
    </Box>
  )
};

export default ScrollButton;