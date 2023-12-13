import { useState, useEffect } from "react";
import { Box, Image as ChakraIMG, Skeleton, Text } from "@chakra-ui/react";
import { Episode } from "@/types/mediaInfo";
import { motion } from "framer-motion";

const imageURL = "https://image.tmdb.org/t/p/original/";

const EpisodeCard = ({
  episode,
  onClick,
}: {
  episode: Episode;
  onClick?: () => void;
}) => {
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const decode = async () => {
      try {
        const image = new Image();
        image.src = imageURL + episode?.still_path;
        await image.decode();

        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
      } catch (error) {
        console.error("Error decoding image:", error);
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
      }
    };

    decode();
  }, [episode]);

  return (
    <Skeleton
    h="full"
      borderRadius="4px"
      isLoaded={!isloading}
      startColor="brand.primary"
      endColor="brand.tertiary"
      fadeDuration={4}
      cursor="pointer"
      boxShadow="0px 20px 15px -10px black"
      transition="transform 500ms ease 0s, box-shadow 500ms ease 0s"
      _hover={{
        transform: "translate(0, -10px)",
        boxShadow: "0px 25px 30px -10px black",
      }}
    >
      <Box
      h="full"
        onClick={onClick}
        bg="brand.dark.800"
        overflow="hidden"
        borderRadius="8px"
        border="4px solid"
        borderColor="brand.dark.600"
        background="linear-gradient(#141414 97%, #030303) border-box"
        _hover={{
          borderColor: "transparent",
          background:
            "linear-gradient(#141414, #141414) padding-box, linear-gradient(to right, #0B92F0, #0FF4C6) border-box",
        }}
      >
        <Box h="full" position="relative">
          <ChakraIMG
            w="full"
            h="full"
            src={imageURL + episode?.still_path}
            fallbackSrc='https://via.placeholder.com/100x50'
            alt={episode?.name}
          />
          <Box
            position="absolute"
            top={0}
            bottom={0}
            right={0}
            left={0}
            zIndex={0}
            bg="linear-gradient(to top, #141414, transparent)"
          />
          <Box
            position="absolute"
            w="75%"
            overflow="hidden"
            bottom={2}
            left={2}
          >
            <Text
              // as={motion.p}
              // animate={{
              //   x: ["-150%", "100%"],
              //   transition: {
              //     duration: 15,
              //     ease: "linear",
              //     repeat: Infinity,
              //     repeatType: "loop",
              //   },
              // }}
              // whiteSpace="nowrap"
              fontWeight="semibold"
            >
              S{episode.season_number} E{episode.episode_number} -{" "}
              {episode.name}
            </Text>
          </Box>
          {episode.runtime && (
            <Text position="absolute" bottom={2} right={2}>
              {episode.runtime} min
            </Text>
          )}
        </Box>
      </Box>
    </Skeleton>
  );
};

export default EpisodeCard;
