import {
  Container,
  Flex,
  VStack,
  HStack,
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Icon,
  Link,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { NavLinks, MenuLinks } from "@/constans/NavItems";
import { Link as RouterLink } from "react-router-dom";
import { Fragment } from "react";

const Navbar = () => {
  return (
    <Flex w="full" position="sticky" top="0" zIndex={1000}>
      <Container minW="full" maxW="full" variant="bottomGradient" p={0}>
        <Flex px="80px" py="20px" justify="space-between">
          <Flex columnGap="36px" justify="flex-start" align="center">
            {NavLinks.map((link) => (
              <Link
                key={link.name}
                as={RouterLink}
                to={link.to}
                fontSize="18px"
                fontWeight="bold"
                color="brand.secondary"
                letterSpacing="2px"
              >
                <HStack>
                  <Icon as={link.icon} boxSize={5} />
                  <Text>{link.name}</Text>
                </HStack>
              </Link>
            ))}
          </Flex>
          <Menu>
            <MenuButton>
              <HStack>
                <Avatar
                  size="md"
                  src="https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=620&quality=85&dpr=1&s=none"
                />
                <VStack alignItems="flex-start" spacing={0}>
                  <Text fontSize="lg" color="brand.secondary">
                    Francesco
                  </Text>
                  <Text fontSize="sm" color="brand.secondary">
                    Carvelli
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <Icon as={BsChevronDown} color="brand.secondary" />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList>
              {MenuLinks.map((menuLink) => (
                <Fragment key={menuLink.name}>
                  {menuLink.name === "Log Out" && <MenuDivider />}
                  <MenuItem>
                    <HStack>
                      <Icon as={menuLink.icon} />
                      <Text>{menuLink.name}</Text>
                    </HStack>
                  </MenuItem>
                </Fragment>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Navbar;
