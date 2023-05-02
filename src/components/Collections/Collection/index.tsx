import { Box, Image, AbsoluteCenter } from '@chakra-ui/react';
import { useState, } from 'react';

const Collection = () => {
  const [showBG, useShowBg] = useState(()=>{return false});

  function startVideo(event: React.MouseEvent<HTMLElement>) {
    useShowBg(true);
    const video: HTMLVideoElement  = event.currentTarget.parentElement?.querySelector(".collectionVideo") as HTMLVideoElement;
    video.play();
  }

  function stopVideo(event: React.MouseEvent<HTMLElement>) {
    useShowBg(false);
    const video: HTMLVideoElement  = event.currentTarget.parentElement?.querySelector(".collectionVideo") as HTMLVideoElement;
    video.pause();
    video.currentTime = 0;
  }

  return (
    <Box 
      width={"320px"} 
      bgGradient={"linear(brand.dark.700, brand.dark.800)"} 
      border={"4px solid"} 
      borderColor={"brand.dark.600"} 
      borderRadius={"16px"}
      position={"relative"}
      overflow={"hidden"}
      _hover={{
        cursor: "pointer",
        borderColor: "transparent",
        background: "linear-gradient(#141414, #141414) padding-box, linear-gradient(to right, #0B92F0, #0FF4C6) border-box", 
      }}
      onMouseEnter={startVideo}
      onMouseLeave={stopVideo}
    >

      <Box visibility={showBG ? "visible" : "hidden"}>
        <video className='collectionVideo' loop playsInline muted>
          <source src="./public/collections/video/marvel.mp4" type="video/mp4" />
        </video>
      </Box>

      <AbsoluteCenter w={"100%"}>
        <Image src="./public/collections/images/scale.png" />
      </AbsoluteCenter>
      
    </Box>
  )
};

export default Collection;