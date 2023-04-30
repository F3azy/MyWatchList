import React from 'react';
import { Image } from '@chakra-ui/react'

const WatchCard = () => {
  return (
    <Image 
      w={"calc(20% - 16px)"} 
      borderRadius={"8px"}
      _hover={{
        cursor: "pointer",
        border: "4px solid transparent",
        background: "linear-gradient(#141414, #141414) padding-box, linear-gradient(to right, #0B92F0, #0FF4C6) border-box", 
      }}
      src="https://gaming-cdn.com/images/products/4836/616x353/marvel-s-avengers-pc-game-steam-cover.jpg?v=1674152653" 
    />
  )
};

export default WatchCard;