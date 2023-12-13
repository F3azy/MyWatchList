import { Provider } from "@/types/mediaInfo";
import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";

const imageURL = "https://image.tmdb.org/t/p/original/";

const WatchProviders = ({
  label,
  providers,
}: {
  label: string;
  providers: Provider[];
}) => {
  return (
    <VStack align="flex-start">
      <Text fontWeight="semibold" fontSize="20px" color="brand.secondary">
        {label}:
      </Text>
      <HStack flexWrap="wrap" gap="16px">
        {providers.map((provider, idx) => (
          <Box boxSize={"70px"} key={idx} overflow="hidden" rounded="lg">
            <Image
              alt={provider.provider_name}
              src={imageURL + provider.logo_path}
            />
          </Box>
        ))}
      </HStack>
    </VStack>
  );
};

export default WatchProviders;
