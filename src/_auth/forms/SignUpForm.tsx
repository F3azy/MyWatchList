import { FormControl, FormLabel, VStack } from "@chakra-ui/react";
import { Input, Divider, Button, Text, Stack, HStack } from "@chakra-ui/react";
import PasswordField from "@/components/forms/PasswordField";
import AuthIcons from "@/components/forms/AuthIcons";

const SignUpForm = () => {
  return (
    <Stack spacing={5}>
      <VStack as="form" w="full" spacing={5}>
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
        <PasswordField repeat />
        <Button w="full" variant="full">Sign up</Button>
      </VStack>
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
