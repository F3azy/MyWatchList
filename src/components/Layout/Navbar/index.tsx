import { Container, Divider, Flex, MenuDivider } from '@chakra-ui/react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from '@chakra-ui/react';
import NavItem from './NavItem';

const Links = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Search",
    to: "/search",
  },
  {
    name: "Movies",
    to: "/",
  },
  {
    name: "Series",
    to: "/",
  },
  {
    name: "My List",
    to: "/",
  },
  {
    name: "Random",
    to: "/",
  },
  {
    name: "Friends",
    to: "/",
  }
];

const Navbar = () => {
  return (
    <Container w={"10%"} minH={"95vh"} variant={"gradient"} m={"0"}>
        <Flex direction={"column"} align={"center"} py={"20px"} rowGap={"20px"}>
          <Menu>
            <MenuButton>
              <Avatar size={"lg"} src='https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=620&quality=85&dpr=1&s=none' />
            </MenuButton>
            <MenuList>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem>Log Out</MenuItem>
            </MenuList>
          </Menu>
          {Links.map((link) => 
            <>
              <NavItem key={link.name} page={link.name} to={link.to} />
              <Divider borderColor={"brand.secondary"} />
            </>
            )}
        </Flex>
    </Container>
  )
};

export default Navbar;