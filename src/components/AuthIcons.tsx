import { Button, ButtonGroup, Icon, VisuallyHidden } from "@chakra-ui/react";
import { Icons } from "@/constans/AuthIcons";

const AuthIcons = () => {
  return (
    <ButtonGroup variant="outline" spacing="4" width="full">
      {Icons.map(({ name, icon }) => (
        <Button key={name} width="full">
          <VisuallyHidden>Sign in with {name}</VisuallyHidden>
          <Icon as={icon} boxSize={5} />
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default AuthIcons;
