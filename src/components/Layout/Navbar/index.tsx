import { Container, Flex, VStack, HStack, Box, Text } from '@chakra-ui/react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Icon,
} from '@chakra-ui/react';
import NavItem from './NavItem';
import { BsChevronDown } from 'react-icons/bs';
import { Links, MenuLinks } from './NavItemProps';


const Navbar = () => {
  return (
    <Flex w="100%" position="sticky" top="0" zIndex={10}>
      <Container minW="100%" maxW="100%" variant="gradient" p={0}>
          <Flex px="80px" py="20px" justify="space-between">
            <Flex columnGap="36px" justify="flex-start" align="center">
            {Links.map((link) => 
              <NavItem key={link.name} name={link.name} to={link.to} icon={link.icon}/>
            )}
            </Flex>
            <Menu>
              <MenuButton>
                <HStack>
                    <Avatar size="md" src='https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=620&quality=85&dpr=1&s=none' />
                    <VStack
                      alignItems="flex-start"
                      spacing={0}>
                      <Text fontSize="lg" color="brand.secondary">
                        Francesco
                      </Text>
                      <Text fontSize="sm" color="brand.secondary">
                        Carvelli
                      </Text>
                    </VStack>
                    <Box display={{ base: 'none', md: 'flex' }}>
                      <Icon as={BsChevronDown} color="brand.secondary" />
                    </Box>
                  </HStack>
              </MenuButton>
              <MenuList>
                {MenuLinks.map((menuLink) => {
                 return <>
                    {(menuLink.name=="Log Out") ? <MenuDivider /> : null}
                    <MenuItem key={menuLink.name}>
                      <HStack><Icon as={menuLink.icon} /><Text>{menuLink.name}</Text></HStack>
                    </MenuItem> 
                 </>
                })}
              </MenuList>
            </Menu>
          </Flex>
      </Container>
    </Flex>
  )
};

export default Navbar;