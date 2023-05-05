import React from 'react';
import { Image } from '@chakra-ui/react'

const WatchCard = () => {
  return (
    <Image 
     w={"calc(20% - 16px)"}
      border={"4px solid transparent"}
      borderRadius={"8px"}
      boxShadow={"0px 20px 15px -10px black"}
      transition={"transform 500ms ease 0s, box-shadow 500ms ease 0s"}
      background={"linear-gradient(#141414 97%, #030303) border-box"} 
      _hover={{
        cursor: "pointer",
        boxShadow: "0px 23px 15px -10px black",
        background: "linear-gradient(#141414, #141414) padding-box, linear-gradient(to right, #0B92F0, #0FF4C6) border-box", 
        transform: "translate(0, -5px)",
      }}
      src="https://gaming-cdn.com/images/products/4836/616x353/marvel-s-avengers-pc-game-steam-cover.jpg?v=1674152653" 
    />
  )
};

export default WatchCard;