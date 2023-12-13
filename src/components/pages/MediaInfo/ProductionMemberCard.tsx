import { MediaProductionMember } from "@/types/mediaInfo";
import { Box, Image as ChakraIMG, Skeleton, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const imageURL = "https://image.tmdb.org/t/p/original/";

const ProductionMemberCard = ({
  member,
}: {
  member: MediaProductionMember;
}) => {
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const decode = async () => {
      try {
        const image = new Image();
        image.src = imageURL + member.profile_path;
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
  }, [member]);

  return (
    <Skeleton
    h="full"
    isLoaded={!isloading}
    startColor="brand.primary"
    endColor="brand.tertiary"
    fadeDuration={4}
    boxShadow={{xl: "0px 20px 15px -10px black"}}
  >
    <Box
      h="full"
      position="relative"
      overflow="hidden"
      role="group"
      cursor="pointer"
    >
      <ChakraIMG
        w="full"
        h="full"
        transform="scale(1) translate(0, 0)"
        transition="transform 500ms ease 0s"
        _groupHover={{ transform: "scale(2) translate(20%, 10%)" }}
        src={imageURL + member.profile_path}
        fallbackSrc="https://via.placeholder.com/150x200"
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
    </Skeleton>
  );
};

export default ProductionMemberCard;
