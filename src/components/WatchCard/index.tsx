import React, { useState } from 'react';
import { Image, Link } from '@chakra-ui/react'
import { Link as RouterLink } from "react-router-dom";

const WatchCard = ({givenWidth, src}: {givenWidth?: string, src?: string}) => {
  const name = "avengers";
  const [url, setUrl] = useState(() => {return "https://image.tmdb.org/t/p/original/"});

  return (
    <Link
      as={RouterLink}
      to={"/info/"+name}
      display="block"
      w={givenWidth ? givenWidth : "calc(12.5% - 18px)"}
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
        src={url+src}
      />
    </Link>
  )
};

export default WatchCard;