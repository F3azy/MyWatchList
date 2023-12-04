import { Box, Text } from "@chakra-ui/react";

const MediaDetail = ({ label, value }: { label: string; value: string }) => {
  return (
    <Box>
      <Text fontSize="15px" color="brand.secondary">
        {label}
      </Text>
      <Text>{value}</Text>
    </Box>
  );
};

export default MediaDetail;
