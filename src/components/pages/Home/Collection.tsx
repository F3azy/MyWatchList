import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Box, Image, AbsoluteCenter } from "@chakra-ui/react";
import { CollectionBox } from "@/types/collection";

const Collection = ({ name, logoSrc, videoSrc }: CollectionBox) => {
  const [showBG, useShowBg] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function startVideo(event: React.MouseEvent<HTMLElement>) {
    useShowBg(true);
    if (videoRef.current) videoRef.current.play();
  }

  function stopVideo(event: React.MouseEvent<HTMLElement>) {
    useShowBg(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }

  return (
    <Box
      as={Link}
      to={"/collection/" + name}
      display="block"
      bgGradient="linear(brand.dark.700, brand.dark.800)"
      border="4px solid"
      borderColor="brand.dark.600"
      borderRadius="16px"
      position="relative"
      overflow="hidden"
      boxShadow={{xl: "0px 27px 30px -10px black"}}
      transition="transform 500ms ease 0s, box-shadow 500ms ease 0s"
      _hover={{
        cursor: "pointer",
        borderColor: "transparent",
        background:
          "linear-gradient(#141414, #141414) padding-box, linear-gradient(to right, #0B92F0, #0FF4C6) border-box",
        transform: {xl: "scale(1.05)"},
        boxShadow: {xl: "0px 27px 30px -8px black"},
      }}
      onMouseEnter={startVideo}
      onMouseLeave={stopVideo}
    >
      <Box visibility={showBG ? "visible" : "hidden"}>
        <video ref={videoRef} loop playsInline muted>
          <source src={videoSrc} type="video/mp4" />
        </video>
      </Box>

      <AbsoluteCenter w="90%">
        <Image src={logoSrc} />
      </AbsoluteCenter>
    </Box>
  );
};

export default Collection;
