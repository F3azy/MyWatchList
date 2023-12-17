import { Button, ButtonGroup, Icon, Text, VisuallyHidden } from "@chakra-ui/react";
import { Icons } from "@/constans/AuthIcons";

const AuthIcons = () => {
  return (
    <ButtonGroup variant="outline" spacing="4" width="full">
      {Icons.map(({ name, icon }) => (
        <Button key={name} width="full">
          <Icon as={icon} boxSize={5} />
          <Text ml={2}>Sign in with {name}</Text>
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default AuthIcons;
