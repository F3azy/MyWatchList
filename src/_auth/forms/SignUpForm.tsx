import {
  Input,
  Divider,
  Button,
  Text,
  Stack,
  HStack,
  FormControl,
  FormLabel,
  Heading,
  VStack,
} from "@chakra-ui/react";
import PasswordField from "@/components/forms/PasswordField";
import AuthIcons from "@/components/auth/AuthIcons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { FormEvent, useRef, useState } from "react";
import AuthLayout from "../AuthLayout";

const SignUpForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const repPassRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const context = useAuth();

  if (!context) return null;

  const { signUp } = context;

  async function handleSubmit(event: FormEvent<HTMLDivElement>) {
    event.preventDefault();

    if (emailRef.current?.value === "") {
      setError("Email is required.");
      return;
    }

    if (passRef.current?.value === "" || repPassRef.current?.value === "") {
      setError("Passwords is required");
      return;
    }

    if (passRef.current?.value.length && passRef.current?.value.length < 6) {
      setError("Password must have at least 6 characters");
      return;
    }

    if (passRef.current?.value !== repPassRef.current?.value) {
      setError("Passwords are not the same");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await signUp(
        emailRef.current?.value as string,
        passRef.current?.value as string
      );
      navigate("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <AuthLayout>
      <Stack w="full" spacing={5}>
        <Heading textAlign="center" color="brand.secondary">
          Sign Up
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
          <PasswordField repeat passRef={repPassRef} />
          <Button w="full" variant="full" type="submit" isLoading={loading}>
            Sign up
          </Button>
        </VStack>
        <Text
          as={Link}
          to="/signin"
          textAlign="center"
          color="brand.secondary"
          textDecoration="underline"
          mx="auto"
        >
          Already have an account?
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
    </AuthLayout>
  );
};

export default SignUpForm;
