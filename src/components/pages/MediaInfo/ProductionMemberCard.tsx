import { MediaProductionMember } from "@/types/mediaInfo";
import { Box, Image, Text } from "@chakra-ui/react";

const imageURL = "https://image.tmdb.org/t/p/original/";

const ProductionMemberCard = ({
  member,
}: {
  member: MediaProductionMember;
}) => {
  return (
    <Box
      h="full"
      position="relative"
      overflow="hidden"
      role="group"
      cursor="pointer"
    >
      <Image
        w="100%"
        h="100%"
        transform="scale(1) translate(0, 0)"
        transition="transform 500ms ease 0s"
        _groupHover={{ transform: "scale(2) translate(20%, 10%)" }}
        src={imageURL + member.profile_path}
        fallbackSrc='https://via.placeholder.com/150'
        alt={member.name}
      />
      <Box
        position="absolute"
        top={0}
        bottom={"-100%"}
        right={0}
        left={0}
        zIndex={0}
        bg="linear-gradient(to top, #141414, transparent)"
        transition="bottom 500ms ease 0s"
        _groupHover={{ bottom: 0 }}
      />
      <Box
        position="absolute"
        bottom="-100%"
        transition="bottom 500ms ease 0s"
        _groupHover={{ bottom: 0 }}
      >
        <Text color="brand.secondary" fontSize="20px">
          {member.name}
        </Text>
        {(member.character || member.job) && (
          <Text>{member.character || member.job}</Text>
        )}
      </Box>
    </Box>
  );
};

export default ProductionMemberCard;
