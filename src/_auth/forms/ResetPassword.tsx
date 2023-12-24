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
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../AuthLayout";
import { useAuth } from "@/contexts/AuthContext";
import { FormEvent, useRef, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import { handleErrors } from "@/utils/firebase";

const ResetPassword = () => {
  const emailRef = useRef<HTMLInputElement>(null);

  const toast = useToast();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const context = useAuth();

  if (!context) return null;

  const { resetPassWord } = context;

  async function handleSubmit(event: FormEvent<HTMLDivElement>) {
    event.preventDefault();

    if (emailRef.current?.value === "") {
      setError("Email is required.");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await resetPassWord(emailRef.current?.value as string);
      toast({
        title: "Email sent.",
        description: "Check your email box.",
        position: "top",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      if (error instanceof FirebaseError) setError(handleErrors(error));
    }

    setLoading(false);
  }
  return (
    <AuthLayout>
      <Stack w="full" spacing={5}>
        <Heading textAlign="center" color="brand.secondary">
          Reset Password
        </Heading>
        <VStack as="form" w="full" spacing={5} onSubmit={handleSubmit}>
          {error !== "" && <Text color="red.500">{error}</Text>}
          <FormControl isRequired>
            <FormLabel color={"brand.secondary"}>Email</FormLabel>
            <Input
              ref={emailRef}
              id="email"
              type="email"
              placeholder="example@domain.com"
              color="brand.secondary"
              borderColor="brand.secondary"
              _hover={{ borderColor: "brand.primary" }}
            />
          </FormControl>
          <Button w="full" variant="full" type="submit" isLoading={loading}>
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
    </AuthLayout>
  );
};

export default ResetPassword;
