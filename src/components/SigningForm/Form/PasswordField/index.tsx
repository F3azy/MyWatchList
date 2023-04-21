import { useState } from 'react';
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react';
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'

const PasswordField = () => {
    const [show, setShow] = useState<boolean>(false);

    const PassVisible = () => setShow(!show);

  return (
    <FormControl>
        <FormLabel color={"brand.secondary"}>Password</FormLabel>
        <InputGroup size='md'>
            <Input
                pr='4.5rem'
                borderColor={"brand.secondary"}
                _hover={{borderColor: "brand.primary"}}
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' bg={"brand.dark"} _hover={{bg: "#252525"}} onClick={PassVisible}>
                {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
        </InputGroup>
    </FormControl>
  )
}

export default PasswordField