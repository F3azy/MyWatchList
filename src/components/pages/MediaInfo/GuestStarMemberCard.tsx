import { MediaProductionMember } from "@/types/mediaInfo";
import { Box, Image, Text, VStack } from "@chakra-ui/react";

const imageURL = "https://image.tmdb.org/t/p/original/";

const GuestStarMemberCard = ({ star }: { star: MediaProductionMember }) => {
  return (
    <VStack w="100%" h="full" align="flex-start">
      <Box w="100%" overflow="hidden">
        <Image
          w="100%"
          src={imageURL + star.profile_path}
          alt={star.name}
          fallbackSrc="https://via.placeholder.com/150x200"
        />
      </Box>
      <Text color="brand.secondary">{star.name}</Text>
      <Text fontSize="14px">{star.character}</Text>
    </VStack>
  );
};

export default GuestStarMemberCard;
