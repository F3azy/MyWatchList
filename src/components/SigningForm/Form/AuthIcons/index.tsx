import { Icon } from '@chakra-ui/react';
import { Button, ButtonGroup, VisuallyHidden } from '@chakra-ui/react';
import { BsGoogle, BsTwitter, BsFacebook } from 'react-icons/bs';

interface SocialIconProps{
  name: string,
  icon: JSX.Element,
};

const Icons: Array<SocialIconProps> = [
    {name: "Google", icon: <Icon as={BsGoogle} boxSize={5} />},
    {name: "Twitter", icon: <Icon as={BsTwitter} boxSize={5} />},
    {name: "Facebook", icon: <Icon as={BsFacebook} boxSize={5} />},
];

const AuthIcons = () => {
  return (
    <ButtonGroup variant="outline" spacing="4" width="full">
        {Icons.map(({name, icon}) => (    
            <Button key={name} width="full">
                <VisuallyHidden>Sign in with {name}</VisuallyHidden>
                {icon}
            </Button>
        ))}
    </ButtonGroup>
  )
};

export default AuthIcons;