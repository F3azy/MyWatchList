import { useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";

const PasswordField = ({repeat}:{repeat?: boolean}) => {
  const [show, setShow] = useState<boolean>(false);

  const PassVisibility = () => setShow(!show);

  return (
    <FormControl>
      <FormLabel color="brand.secondary">{repeat && "Repeat "}Password</FormLabel>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          borderColor="brand.secondary"
          color="brand.secondary"
          _hover={{ borderColor: "brand.primary" }}
          type={show ? "text" : "password"}
          placeholder="Must have at least 8 characters"
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            bg="brand.dark.base"
            color="brand.secondary"
            _hover={{ bg: "#252525" }}
            onClick={PassVisibility}
          >
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default PasswordField;
