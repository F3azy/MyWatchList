import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react';
import { Input, Divider, Button, Text, Stack, HStack } from '@chakra-ui/react';
import PasswordField from './PasswordField';
import AuthIcons from './AuthIcons';

const Form = ({SignIn}: {SignIn: boolean}) => {
  return (
    <Stack spacing={5}>
        {(SignIn) ? null : 
        <>
          <FormControl>
              <FormLabel color={"brand.secondary"}>First Name *</FormLabel>
              <Input 
              id="email" 
              type='email' 
              placeholder='example@domain.com'
              borderColor={"brand.secondary"} 
              _hover={{borderColor: "brand.primary"}} />
          </FormControl>
          <FormControl>
              <FormLabel color={"brand.secondary"}>Last Name *</FormLabel>
              <Input 
              id="email" 
              type='email' 
              placeholder='example@domain.com'
              borderColor={"brand.secondary"} 
              _hover={{borderColor: "brand.primary"}} />
          </FormControl>
        </>
        }
        <FormControl>
            <FormLabel color={"brand.secondary"}>Email{(SignIn) ? "" : " *"}</FormLabel>
            <Input 
            id="email" 
            type='email' 
            placeholder='example@domain.com'
            borderColor={"brand.secondary"} 
            _hover={{borderColor: "brand.primary"}} />
        </FormControl>
        <PasswordField SignIn={SignIn} />
        <Button variant={'full'}> {(SignIn) ? "Sign in" : "Sign up"} </Button>
        <HStack>
          <Divider />
          <Text fontSize={"sm"} whiteSpace="nowrap">OR</Text>
          <Divider />
        </HStack>
        <AuthIcons />
    </Stack>
  )
};

export default Form;