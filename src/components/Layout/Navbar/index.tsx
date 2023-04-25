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
import { BiHomeAlt, BiSearch, BiMovie, BiCameraMovie, BiTable } from 'react-icons/bi';
import { FaRandom, FaUserFriends } from 'react-icons/fa';
import { LinkItemProps } from '../../../interfaces';


const Links: Array<LinkItemProps> = [
  {
    name: "Home",
    to: "/",
    icon: BiHomeAlt,
  },
  {
    name: "Search",
    to: "/search",
    icon: BiSearch,
  },
  {
    name: "Movies",
    to: "/movies",
    icon: BiCameraMovie,
  },
  {
    name: "Series",
    to: "/series",
    icon: BiMovie,
  },
  {
    name: "My List",
    to: "/myList",
    icon: BiTable,
  },
  {
    name: "Random",
    to: "/random",
    icon: FaRandom,
  },
  {
    name: "Friends",
    to: "/friends",
    icon: FaUserFriends,
  }
];

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
                    <Text fontSize="lg" color="brand.secondary">Francesco</Text>
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