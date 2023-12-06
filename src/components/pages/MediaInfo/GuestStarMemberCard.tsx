import { GuestStarsMember } from "@/types/mediaInfo";
import { Box, Image, Text, VStack } from "@chakra-ui/react";

const imageURL = "https://image.tmdb.org/t/p/original/";

const GuestStarMemberCard = ({
  star
}: {
  star: GuestStarsMember
}) => {
  return (
    <VStack h="full" align="flex-start">
        <Box overflow="hidden">
          <Image src={imageURL + star.profile_path} alt={star.name} />
        </Box>
        <Text color="brand.secondary">
          {star.name}
        </Text>
        <Text fontSize="14px">
          {star.character}
        </Text>
    </VStack>
  );
};

export default GuestStarMemberCard;
