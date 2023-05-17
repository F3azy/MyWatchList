import React, { useState, useEffect } from 'react';
import { Image, Link, Skeleton } from '@chakra-ui/react'
import { Link as RouterLink } from "react-router-dom";

const WatchCard = ({givenWidth, id, type}: {givenWidth?: string, id?: number, type?: string}) => {

  const [imageUrl, setImageUrl] = useState(() => {return "https://image.tmdb.org/t/p/original/"});

  const [url, setUrl] = useState(() => {return "https://api.themoviedb.org/3/"});
  const [watchCard, setWatchCard] = useState<any>(() => {return []});
  const [isloading, setIsLoading] = useState(() => {return true});

  useEffect(() => {
    setIsLoading(true);

    fetch(url+type+`/${id}?api_key=${import.meta.env.VITE_MOVIE_API_KEY}`)
    .then(response => {return response.json()})
    .then(movie => {
        setWatchCard(movie) 
        setTimeout(() => setIsLoading(false), 1200);
      })
  }, []);

  return (
    <Skeleton 
    w={givenWidth ? givenWidth : "calc(20% - 16px)"}
    minH="294px" 
    borderRadius="4px" 
    isLoaded={!isloading}
    startColor='brand.primary' 
    endColor='brand.tertiary' 
    fadeDuration={3} 
    >
      <Link
        as={RouterLink}
        to={"/info/"+(watchCard.name ? watchCard.name : watchCard.title)+"/"+watchCard.id}
        display="block"
        // w={givenWidth ? givenWidth : "calc(20% - 16px)"}
        transition="transform 500ms ease 0s, box-shadow 500ms ease 0s"
        _hover={{
          transform: "translate(0, -5px)",
        }}
      >
          <Image 
            w="100%"
            minH="294px" 
            borderRadius="8px"
            border="4px solid"
            borderColor="brand.dark.600"
            boxShadow="0px 20px 15px -10px black"
            background="linear-gradient(#141414 97%, #030303) border-box"
            _hover={{
              borderColor: "transparent",
              background: "linear-gradient(#141414, #141414) padding-box, linear-gradient(to right, #0B92F0, #0FF4C6) border-box", 
            }}
            src={imageUrl+watchCard?.poster_path}
            alt={watchCard.name ? watchCard.name : watchCard.title}
          />
      </Link>
    </Skeleton>
  )
};

export default WatchCard;