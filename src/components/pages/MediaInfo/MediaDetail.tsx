import { Box, Text } from "@chakra-ui/react";

const MediaDetail = ({ label, value }: { label: string; value: string }) => {
  return (
    <Box>
      <Text fontSize={{base: "16px", xl: "15px"}} color="brand.secondary">
        {label}
      </Text>
      <Text fontSize={{base: "18px", xl: "16px"}}>{value}</Text>
    </Box>
  );
};

export default MediaDetail;
