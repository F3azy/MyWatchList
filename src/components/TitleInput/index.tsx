import React, { FormEvent } from 'react';
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const TitleInput = () => {

    function getTitle(event: FormEvent<HTMLInputElement>): void {
        console.log(event.currentTarget.value);
    }

  return (
    <InputGroup size={"lg"}>
        <InputLeftElement
            pointerEvents='none'
            children={<SearchIcon boxSize={6} color='brand.secondary' />}
        />
        <Input 
            fontSize={"28px"}
            size={"lg"}
            borderColor={"brand.secondary"} 
            _hover={{borderColor: "brand.primary"}}
            type='text' 
            placeholder='Title...' 
            onInput={getTitle}
        />
    </InputGroup>
  )
};

export default TitleInput;