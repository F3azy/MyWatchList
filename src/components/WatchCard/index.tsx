import React from 'react';
import { Image, Link } from '@chakra-ui/react'
import { Link as RouterLink } from "react-router-dom";

const WatchCard = ({givenWidth}: {givenWidth?: string}) => {
  const name = "avengers";
  return (
    <Link
      as={RouterLink}
      to={"/info/"+name}
      display="block"
      w={givenWidth ? givenWidth : "calc(20% - 16px)"}
      transition="transform 500ms ease 0s, box-shadow 500ms ease 0s"
      _hover={{
        transform: "translate(0, -5px)",
      }}
    >
    <Image 
      w="100%"
      border="4px solid transparent"
      borderRadius="8px"
      boxShadow="0px 20px 15px -10px black"
      background="linear-gradient(#141414 97%, #030303) border-box"
      _hover={{
        cursor: "pointer",
        background: "linear-gradient(#141414, #141414) padding-box, linear-gradient(to right, #0B92F0, #0FF4C6) border-box", 
      }}
      src="https://gaming-cdn.com/images/products/4836/616x353/marvel-s-avengers-pc-game-steam-cover.jpg?v=1674152653" 
      />
      </Link>
  )
};

export default WatchCard;