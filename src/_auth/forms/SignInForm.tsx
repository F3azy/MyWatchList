import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  Divider,
  Button,
  Text,
  Stack,
  HStack,
  VStack,
} from "@chakra-ui/react";
import PasswordField from "@/components/forms/PasswordField";
import AuthIcons from "@/components/auth/AuthIcons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { FirebaseError } from "firebase/app";
import { handleErrors } from "@/utils/firebase";

const SignInForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state?.errorMessage) setError(state?.errorMessage);
  }, []);

  const { signIn } = useAuth();

  async function handleSubmit(event: FormEvent<HTMLDivElement>) {
    event.preventDefault();

    if (emailRef.current?.value === "") {
      setError("Email is required.");
      return;
    }

    if (passRef.current?.value === "") {
      setError("Passwords is required");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await signIn(
        emailRef.current?.value as string,
        passRef.current?.value as string
      );
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) setError(handleErrors(error));
    }

    setLoading(false);
  }

  return (
      <Stack w="full" spacing={5}>
        <Heading textAlign="center" color="brand.secondary">
          Sign In
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
          <PasswordField passRef={passRef} />
          <Button w="full" variant="full" type="submit" isLoading={loading}>
            Sign in
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
            to="/reset-password"
            textAlign="center"
            color="brand.secondary"
            textDecoration="underline"
          >
            Forgot Password?
          </Text>
        </HStack>
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
