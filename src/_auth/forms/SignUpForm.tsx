import { FormControl, FormLabel } from "@chakra-ui/react";
import { Input, Divider, Button, Text, Stack, HStack } from "@chakra-ui/react";
import PasswordField from "@/components/forms/PasswordField";
import AuthIcons from "@/components/AuthIcons";

const SignUpForm = () => {
  return (
    <Stack spacing={5}>
      <FormControl>
        <FormLabel color={"brand.secondary"}>First Name</FormLabel>
        <Input
          id="name"
          type="text"
          placeholder="Jerry"
          color="brand.secondary"
          borderColor="brand.secondary"
          _hover={{ borderColor: "brand.primary" }}
        />
      </FormControl>
      <FormControl>
        <FormLabel color={"brand.secondary"}>Last Name</FormLabel>
        <Input
          id="lastName"
          type="text"
          placeholder="Smith"
          color="brand.secondary"
          borderColor="brand.secondary"
          _hover={{ borderColor: "brand.primary" }}
        />
      </FormControl>
      <FormControl>
        <FormLabel color={"brand.secondary"}>Email</FormLabel>
        <Input
          id="email"
          type="email"
          placeholder="example@domain.com"
          pattern=".+@example\.com"
          color="brand.secondary"
          borderColor="brand.secondary"
          _hover={{ borderColor: "brand.primary" }}
        />
      </FormControl>
      <PasswordField />
      <Button variant="full">Sign up</Button>
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

export default SignUpForm;
