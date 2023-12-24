import { useEffect, useState } from "react";
import AuthLayout from "../AuthLayout";
import { Button, Heading, Stack, Text, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { FirebaseError } from "firebase/app";
import { handleErrors } from "@/utils/firebase";
import { Link as RouterLink } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [tokenExpired, setTokenExpired] = useState(false);
  const [loading, setLoading] = useState(false);

  const [seconds, setSeconds] = useState(59);

  const { resendEmailVerification, user } = useAuth();

  async function handleResend() {
    try {
      setError("");
      setLoading(true);
      await resendEmailVerification();
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.log(error.code);

        setError(handleErrors(error));
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    const checkForVerifiedInterval = setInterval(async () => {
      try {
        await user?.reload();
        if (user?.emailVerified) {
          navigate("/");
        }
      } catch (error) {
        if (error instanceof FirebaseError) {
          if (error.code === "auth/user-token-expired") setTokenExpired(true);
          setError(handleErrors(error));
          clearInterval(checkForVerifiedInterval);
        }
      }
    }, 2000);

    return () => clearInterval(checkForVerifiedInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  function resendTimer() {
    setSeconds(59);
  }

  return (
    <AuthLayout>
      {tokenExpired ? (
        <Stack w="full" spacing={8} textAlign="center" letterSpacing={1}>
          <Heading color="red.500">Something went wrong.</Heading>
          {error !== "" && <Text color="red.500">{error}</Text>}
          <Link
            as={RouterLink}
            to="/signup"
            color="brand.secondary"
            textDecoration="underline"
            fontSize="24px"
          >
            Go back to the signup form.
          </Link>
        </Stack>
      ) : (
        <Stack w="full" spacing={8} textAlign="center" letterSpacing={1}>
          {error !== "" && <Text color="red.500">{error}</Text>}
          <Heading color="brand.secondary">Verify Email</Heading>
          <Text>
            You're almost there! We sent you and email to{" "}
            <Text fontWeight="semibold" as="span">
              {user?.email}
            </Text>
          </Text>
          <Text>
            Just click on the link in that email to complete your singup. If you
            don't see it, you may need to check your spam folder.
          </Text>
          <Text>Still can't find the email?</Text>
          <Button
            w="full"
            variant="full"
            onClick={
              seconds > 0
                ? () => {}
                : () => {
                    handleResend();
                    resendTimer();
                  }
            }
            isLoading={loading}
            isDisabled={seconds > 0}
          >
            {seconds > 0 ? seconds + "s" : "Resend Email"}
          </Button>
        </Stack>
      )}
    </AuthLayout>
  );
};

export default VerifyEmail;
