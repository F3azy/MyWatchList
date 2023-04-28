import { Container, Divider, Flex, VStack, HStack, Box, Text } from '@chakra-ui/react';
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
import { Links } from './NavItemProps';


const Navbar = () => {
  return (
    <Container w={"10%"} minH={"95vh"} variant={"gradient"} m={"0"}>
        <Flex direction={"column"} py={"20px"} rowGap={"20px"}>
          <Menu>
            <MenuButton>
              <HStack>
                  <Avatar size={"md"} src='https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=620&quality=85&dpr=1&s=none' />
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
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem>Log Out</MenuItem>
            </MenuList>
          </Menu>
          {Links.map((link) => 
            <>
              <NavItem key={link.name} name={link.name} to={link.to} icon={link.icon}/>
              <Divider borderColor={"brand.secondary"} />
            </>
            )}
        </Flex>
    </Container>
  )
};

export default Navbar;