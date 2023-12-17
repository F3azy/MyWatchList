import { FormControl, FormLabel } from "@chakra-ui/react";
import {
  Input,
  Divider,
  Button,
  Text,
  Stack,
  HStack,
  VStack,
} from "@chakra-ui/react";
import PasswordField from "@/components/forms/PasswordField";
import AuthIcons from "@/components/forms/AuthIcons";
import { Link } from "react-router-dom";

const SignInForm = () => {
  return (
    <Stack w="full" spacing={5}>
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
        <PasswordField />
        <Button w="full" variant="full">
          Sign in
        </Button>
      </VStack>
      <Text
        as={Link}
        textAlign="center"
        color="brand.secondary"
        textDecoration="underline"
        mx="auto"
      >
        Forgot Password?
      </Text>
      <HStack>
        <Divider />
        <Text fontSize="sm" whiteSpace="nowrap">
          OR
        </Text>
        <Divider />
      </HStack>
      <AuthIcons />
    </Stack>
  );
};

export default SignInForm;
