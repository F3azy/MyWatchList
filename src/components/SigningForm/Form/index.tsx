import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Stack } from '@chakra-ui/react';
import { Input, Divider, Button } from '@chakra-ui/react';
import PasswordField from './PasswordField';


const Form = () => {
  return (
    <Stack spacing={5}>
        <FormControl>
            <FormLabel color={"brand.secondary"}>Email</FormLabel>
            <Input id="email" type='email' borderColor={"brand.secondary"} _hover={{borderColor: "brand.primary"}} />
        </FormControl>
        <PasswordField />
    </Stack>
  )
}

export default Form