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
  useSteps,
  Stepper,
  StepIndicator,
  Step,
  StepSeparator,
  StepStatus,
  StepIcon,
  ButtonGroup,
  Box,
} from "@chakra-ui/react";
import PasswordField from "@/components/forms/PasswordField";
import AuthIcons from "@/components/auth/AuthIcons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { FormEvent, useRef, useState } from "react";
import { FirebaseError } from "firebase/app";
import { handleErrors } from "@/utils/firebase";
import FavGenreInput from "@/components/forms/FavGenreInput";
import useFetch from "@/hooks/useFetch";
import { Genres } from "@/types/common";

const steps = [
  { title: "First", description: "Account Details" },
  { title: "Second", description: "Full Name" },
  { title: "Third", description: "Favorite genres" },
];

const url = "https://api.themoviedb.org/3/genre/";

const SignUpForm = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const repPassRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [movieFavGenres, setMovieFavGenres] = useState<string[]>([]);
  const [tvFavGenres, setTvFavGenres] = useState<string[]>([]);

  const { data: movieGenre } = useFetch<Genres>(
    url + `movie/list?api_key=${import.meta.env.VITE_MOVIE_API_KEY}`
  );

  const { data: tvGenre } = useFetch<Genres>(
    url + `tv/list?api_key=${import.meta.env.VITE_MOVIE_API_KEY}`
  );

  const navigate = useNavigate();

  const { signUp } = useAuth();

  function handleAccountDetails() {
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

    setActiveStep((prev) => (prev = prev + 1));
  }

  function handleFullName() {
    if (firstNameRef.current?.value === "") {
      setError("First name is required.");
      return;
    }

    if (firstNameRef.current?.value === "") {
      setError("Last name is required.");
      return;
    }

    setActiveStep((prev) => (prev = prev + 1));
  }

  async function handleSubmit(event: FormEvent<HTMLDivElement>) {
    event.preventDefault();

    if (movieFavGenres.length < 1 || tvFavGenres.length < 1) {
      setError("Select at least 1 favorite genre for each media.");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await signUp(
        emailRef.current?.value as string,
        passRef.current?.value as string,
        firstNameRef.current?.value as string,
        lastNameRef.current?.value as string,
        movieFavGenres.join(","),
        tvFavGenres.join(",")
      );
      navigate("/verify");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) setError(handleErrors(error));
    }

    setLoading(false);
  }

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <Stack w="full" spacing={5}>
      <Heading textAlign="center" color="brand.secondary">
        Sign Up
      </Heading>
      <VStack as="form" w="full" spacing={5} onSubmit={handleSubmit}>
        {error !== "" && <Text color="red.500">{error}</Text>}
        <Stepper w="full" size="sm" index={activeStep} gap={0}>
          {steps.map((step, index) => (
            <Step key={index} style={{ gap: 0 }}>
              <StepIndicator>
                <StepStatus complete={<StepIcon />} />
              </StepIndicator>
              <StepSeparator style={{ marginLeft: 0 }} />
            </Step>
          ))}
        </Stepper>
        <VStack
          w="full"
          display={activeStep === 0 ? "flex" : "none"}
          spacing={5}
        >
          <FormControl isRequired>
            <FormLabel color={"brand.secondary"}>Email</FormLabel>
            <Input
              ref={emailRef}
              type="email"
              placeholder="example@domain.com"
              color="brand.secondary"
              borderColor="brand.secondary"
              _hover={{ borderColor: "brand.primary" }}
            />
          </FormControl>
          <PasswordField passRef={passRef} />
          <PasswordField repeat passRef={repPassRef} />
        </VStack>
        <VStack
          w="full"
          display={activeStep === 1 ? "flex" : "none"}
          spacing={5}
        >
          <FormControl isRequired>
            <FormLabel color={"brand.secondary"}>First Name</FormLabel>
            <Input
              ref={firstNameRef}
              type="text"
              placeholder="Jerry"
              color="brand.secondary"
              borderColor="brand.secondary"
              _hover={{ borderColor: "brand.primary" }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel color={"brand.secondary"}>Last Name</FormLabel>
            <Input
              ref={lastNameRef}
              type="text"
              placeholder="Smith"
              color="brand.secondary"
              borderColor="brand.secondary"
              _hover={{ borderColor: "brand.primary" }}
            />
          </FormControl>
        </VStack>
        <Box display={activeStep === 2 ? "flex" : "none"}>
          <VStack w="full" spacing={5}>
            <FormControl isRequired>
              <FormLabel color={"brand.secondary"}>
                Favorite movie genres:
              </FormLabel>
              <FavGenreInput
                genres={movieGenre?.genres}
                favGenres={movieFavGenres}
                setFavGenres={setMovieFavGenres}
                setError={setError}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color={"brand.secondary"}>
                Favorite series genres:
              </FormLabel>
              <FavGenreInput
                genres={tvGenre?.genres}
                favGenres={tvFavGenres}
                setFavGenres={setTvFavGenres}
                setError={setError}
              />
            </FormControl>
          </VStack>
        </Box>
        <ButtonGroup
          display={activeStep === 2 ? "inline-flex" : "none"}
          w="full"
          spacing="24px"
        >
          <Button
            w="full"
            variant="full"
            onClick={() => setActiveStep((prev) => (prev = prev - 1))}
          >
            Prev
          </Button>
          <Button w="full" variant="full" type="submit" isLoading={isLoading}>
            Sign up
          </Button>
        </ButtonGroup>
        <ButtonGroup
          display={activeStep !== 2 ? "inline-flex" : "none"}
          w="full"
          spacing="24px"
        >
          <Button
            w="full"
            variant="full"
            onClick={
              activeStep === 0
                ? () => {}
                : () => setActiveStep((prev) => (prev = prev - 1))
            }
          >
            Prev
          </Button>
          <Button
            w="full"
            variant="full"
            onClick={
              activeStep === 0
                ? () => handleAccountDetails()
                : activeStep === 1
                ? () => handleFullName()
                : () => {}
            }
          >
            Next
          </Button>
        </ButtonGroup>
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
  );
};

export default SignUpForm;
