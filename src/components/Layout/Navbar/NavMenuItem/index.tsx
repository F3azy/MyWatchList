import React from 'react';
import {
    MenuItem,
    MenuDivider,
    Icon,
    HStack,
    Text,
} from '@chakra-ui/react';
import { LinkItemProps } from '../NavItemProps';

const NavMenuItem = ({name, to, icon} : LinkItemProps) => {
  return (
    <>
        {(name=="Log Out") ? <MenuDivider /> : null}
        <MenuItem key={name}>
          <HStack><Icon as={icon} /><Text>{name}</Text></HStack>
        </MenuItem> 
    </>
  )
};

export default NavMenuItem;