import React, { FormEvent } from 'react';
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const TitleInput = ({setTitle}: {setTitle: React.Dispatch<React.SetStateAction<string>>}) => {

    function getTitle(event: FormEvent<HTMLInputElement>): void {
        setTitle(event.currentTarget.value);
    }

  return (
    <InputGroup size="lg">
        <InputLeftElement
            pointerEvents='none'
            children={<SearchIcon boxSize={6} color='brand.secondary' />}
        />
        <Input 
            fontSize="28px"
            fontWeight="700"
            color="brand.secondary"
            size="lg"
            borderColor="brand.secondary"
            _hover={{borderColor: "brand.primary"}}
            type='text' 
            placeholder='Title...' 
            onInput={getTitle}
        />
    </InputGroup>
  )
};

export default TitleInput;