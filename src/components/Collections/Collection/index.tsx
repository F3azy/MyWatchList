import { Box, Image, AbsoluteCenter } from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { CollectionProps } from '../CollectionProps';

const Collection = ({logoSrc, videoSrc}: CollectionProps) => {
  const [showBG, useShowBg] = useState(()=>{return false});
  const videoRef = useRef<HTMLVideoElement>(null);

  function startVideo(event: React.MouseEvent<HTMLElement>) {
    useShowBg(true);
    if(videoRef.current) videoRef.current.play();
  }

  function stopVideo(event: React.MouseEvent<HTMLElement>) {
    useShowBg(false);
    if(videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0
    };
  }

  return (
    <Box 
      width={"calc(15.5%)"} 
      minH={"80px"}
      bgGradient={"linear(brand.dark.700, brand.dark.800)"} 
      border={"4px solid"} 
      borderColor={"brand.dark.600"} 
      borderRadius={"16px"}
      position={"relative"}
      overflow={"hidden"}
      boxShadow={"0px 27px 30px -10px black"}
      transition={"transform 500ms ease 0s, box-shadow 500ms ease 0s"}
      _hover={{
        cursor: "pointer",
        borderColor: "transparent",
        background: "linear-gradient(#141414, #141414) padding-box, linear-gradient(to right, #0B92F0, #0FF4C6) border-box", 
        transform: "scale(1.05)",
        boxShadow: "0px 27px 30px -8px black", 
      }}
      onMouseEnter={startVideo}
      onMouseLeave={stopVideo}
    >

      <Box visibility={showBG ? "visible" : "hidden"}>
        <video ref={videoRef} className='collectionVideo' loop playsInline muted>
          <source src={videoSrc} type="video/mp4" />
        </video>
      </Box>

      <AbsoluteCenter w={"95%"}>
        <Image src={logoSrc} />
      </AbsoluteCenter>
      
    </Box>
  )
};

export default Collection;