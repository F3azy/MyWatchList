import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <Stack w="full" spacing={5}>
      <Heading textAlign="center" color="brand.secondary">
        Reset Password
      </Heading>
      <VStack as="form" w="full" spacing={5}>
        <FormControl>
          <FormLabel color={"brand.secondary"}>Email</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="example@domain.com"
            color="brand.secondary"
            borderColor="brand.secondary"
            _hover={{ borderColor: "brand.primary" }}
          />
        </FormControl>
        <Button w="full" variant="full">
          Reset password
        </Button>
      </VStack>
      <HStack justify="space-between">
        <Text
          as={Link}
          to="/signup"
          textAlign="center"
          color="brand.secondary"
          textDecoration="underline"
        >
          Don't have an account?
        </Text>
        <Text
          as={Link}
          to="/signin"
          textAlign="center"
          color="brand.secondary"
          textDecoration="underline"
        >
          Sing In
        </Text>
      </HStack>
    </Stack>
  );
};

export default ResetPassword;
