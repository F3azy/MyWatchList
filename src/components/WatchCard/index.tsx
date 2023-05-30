import React, { useState, useEffect } from 'react';
import { Image as ChakraIMG, Link, Skeleton } from '@chakra-ui/react'
import { Link as RouterLink } from "react-router-dom";

const WatchCard = ({givenWidth, givenHeight, id, type, title, SpecImageURL}: {givenWidth?: string, givenHeight?: string, id: number, type: string, title: string, SpecImageURL: string}) => {

  const imageURL = "https://image.tmdb.org/t/p/original/";

  const url = "https://api.themoviedb.org/3/";
  // const [watchCard, setWatchCard] = useState<any>(() => {return null});
  const [isloading, setIsLoading] = useState(() => {return true});

  // useEffect(() => {
  //   setIsLoading(true);

  //   const fetching = async () => { 
  //     try {
  //       const response  = await fetch(url+type+`/${id}?api_key=${import.meta.env.VITE_MOVIE_API_KEY}`);
  //       const json = await response.json();
  //       setWatchCard(json);

  //       const timer = setTimeout(() => setIsLoading(false), 1200);
  //       return () => clearTimeout(timer);
  //     }
  //     catch (error) {
  //       console.error('Error fetching:', error);
  //     }
  //   }

  //   fetching();
  // }, []);

  useEffect(() => {
    setIsLoading(true);
    const decode = async () => {
        const image = new Image();
        image.src = imageURL+SpecImageURL;
        await image.decode();

        const timer = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(timer);
    }

    decode();
  }, [SpecImageURL]);

  return (
    <Skeleton 
    w={givenWidth ? givenWidth : "calc(20% - 16px)"}
    h={givenHeight ? givenHeight : "auto"} 
    borderRadius="4px" 
    isLoaded={!isloading}
    startColor='brand.primary' 
    endColor='brand.tertiary' 
    fadeDuration={4} 
    >
      <Link
        as={RouterLink}
        // to={"/info/"+type+"/"+(watchCard?.name ? watchCard?.name : watchCard?.title)+"/"+watchCard?.id}
        to={"/info/"+type+"/"+title+"/"+id}
        display="block"
        // w={givenWidth ? givenWidth : "calc(20% - 16px)"}
        transition="transform 500ms ease 0s, box-shadow 500ms ease 0s"
        _hover={{
          transform: "translate(0, -5px)",
        }}
      >
        <ChakraIMG 
          w="100%"
          h={givenHeight ? givenHeight : "auto"} 
          borderRadius="8px"
          border="4px solid"
          borderColor="brand.dark.600"
          boxShadow="0px 20px 15px -10px black"
          background="linear-gradient(#141414 97%, #030303) border-box"
          _hover={{
            borderColor: "transparent",
            background: "linear-gradient(#141414, #141414) padding-box, linear-gradient(to right, #0B92F0, #0FF4C6) border-box", 
          }}
          src={imageURL+SpecImageURL}
          // src={watchCard ? imageUrl+watchCard.poster_path : ""}
          // src={"https://m.media-amazon.com/images/M/MV5BMjM2NTQ5Mzc2M15BMl5BanBnXkFtZTgwNTcxMDI2NTE@._V1_.jpg"}
          // alt={watchCard?.name ? watchCard?.name : watchCard?.title}
          alt={title}
        />
      </Link>
    </Skeleton>
  )
};

export default WatchCard;