import { imageURL } from "@/constans/APILinks";
import { MediaProductionMember } from "@/types/mediaInfo";
import { Box, Image as ChakraIMG, Skeleton, Text, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const GuestStarMemberCard = ({ star }: { star: MediaProductionMember }) => {
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const decode = async () => {
      try {
        const image = new Image();
        image.src = imageURL + star.profile_path;
        await image.decode();

        setIsLoading(false);
      } catch (error) {
        console.error("Error decoding image:", error);
        setIsLoading(false);
      }
    };

    decode();
  }, [star]);

  return (
    <Skeleton
      h="full"
      isLoaded={!isloading}
      startColor="brand.primary"
      endColor="brand.tertiary"
      fadeDuration={4}
    >
      <VStack w="full" h="full" align="flex-start">
        <Box w="full" overflow="hidden">
          <ChakraIMG
            w="full"
            src={imageURL + star.profile_path}
            alt={star.name}
            fallbackSrc="https://via.placeholder.com/150x200"
          />
        </Box>
        <Text color="brand.secondary">{star.name}</Text>
        <Text fontSize="14px">{star.character}</Text>
      </VStack>
    </Skeleton>
  );
};

export default GuestStarMemberCard;
