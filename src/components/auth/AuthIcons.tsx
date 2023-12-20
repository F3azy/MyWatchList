import { Button, Icon, Text, VStack } from "@chakra-ui/react";
import { Icons } from "@/constans/AuthIcons";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FirebaseProviders } from "@/types/Auth";

const AuthIcons = () => {
  const navigate = useNavigate();

  const context = useAuth();

  if (!context) return null;

  const { providersSignIn } = context;

  const handleProviderSignIn = async (provider: FirebaseProviders) => {
    try {
      await providersSignIn[provider]();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VStack spacing="4" width="full">
      {Icons.map(({ name, icon }) => (
        <Button
          key={name}
          width="full"
          variant="outline"
          onClick={() => handleProviderSignIn(name)}
        >
          <Icon as={icon} boxSize={5} />
          <Text ml={2}>Sign in with {name}</Text>
        </Button>
      ))}
    </VStack>
  );
};

export default AuthIcons;
