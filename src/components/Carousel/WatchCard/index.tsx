import React from 'react';
import { Image } from '@chakra-ui/react'

const WatchCard = () => {
  return (
    <Image 
      w={"300px"} 
      h={"170px"}
      borderRadius={"4px"}
      _hover={{
        cursor: "pointer",
        border: "1px solid transparent",
        background: "linear-gradient(#141414, #141414) padding-box, linear-gradient(to right, #0B92F0, #0FF4C6) border-box", 
      }}
      src="https://gaming-cdn.com/images/products/4836/616x353/marvel-s-avengers-pc-game-steam-cover.jpg?v=1674152653" 
    />
  )
};

export default WatchCard;