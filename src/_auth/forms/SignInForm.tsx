import { FormControl, FormLabel } from "@chakra-ui/react";
import { Input, Divider, Button, Text, Stack, HStack } from "@chakra-ui/react";
import PasswordField from "@/components/forms/PasswordField";
import AuthIcons from "@/components/AuthIcons";

const SignInForm = () => {
  return (
    <Stack spacing={5}>
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
      <Button variant="full">Sign in</Button>
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
