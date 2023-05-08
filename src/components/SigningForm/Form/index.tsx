import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react';
import { Input, Divider, Button, Text, Stack, HStack } from '@chakra-ui/react';
import PasswordField from './PasswordField';
import AuthIcons from './AuthIcons';
import { Inputs } from './FormProps';

const Form = ({SignIn}: {SignIn: boolean}) => {

  return (
    <Stack spacing={5}>
        {(!SignIn) ? 
        Inputs.map((input) => 
          <FormControl>
              <FormLabel color="brand.secondary">{input.label} *</FormLabel>
              <Input 
              id={input.id} 
              type={input.type} 
              placeholder={input.placeholder}
              color="brand.secondary"
              borderColor="brand.secondary" 
              _hover={{borderColor: "brand.primary"}} />
          </FormControl>
        ) :
        <FormControl>
            <FormLabel color={"brand.secondary"}>{Inputs[2].label}</FormLabel>
            <Input 
            id={Inputs[2].id} 
            type={Inputs[2].type} 
            placeholder={Inputs[2].placeholder}
            color="brand.secondary"
            borderColor="brand.secondary" 
            _hover={{borderColor: "brand.primary"}} />
        </FormControl>
        }
        <PasswordField SignIn={SignIn} />
        <Button variant='full'> {(SignIn) ? "Sign in" : "Sign up"} </Button>
        <HStack>
          <Divider />
          <Text fontSize="sm" whiteSpace="nowrap">OR</Text>
          <Divider />
        </HStack>
        <AuthIcons />
    </Stack>
  )
};

export default Form;