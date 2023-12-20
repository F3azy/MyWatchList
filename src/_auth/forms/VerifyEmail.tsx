import { useEffect, useState } from "react";
import AuthLayout from "../AuthLayout";
import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const VerifyEmail = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [seconds, setSeconds] = useState(59);

  const context = useAuth();

  if (!context) return null;

  const { resendEmailVerification, user } = context;

  async function handleResend() {
    try {
      setError("");
      setLoading(true);
      await resendEmailVerification();
    } catch {
      setError("Failed to resend the email");
    }

    setLoading(false);
  }

  useEffect(() => {
    const checkForVerifiedInterval = setInterval(() => {
      user?.reload().then((ok) => {
        if (user?.emailVerified) {
          navigate("/");
        }
      });
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
    </AuthLayout>
  );
};

export default VerifyEmail;
