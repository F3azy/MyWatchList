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
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  Divider,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { NavLinks, MenuLinks } from "@/constans/NavItems";
import { Link as RouterLink } from "react-router-dom";
import { Fragment } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex w="full" position="fixed" top="0" zIndex={1000}>
        <Container minW="full" maxW="full" variant="bottomGradient" p={0}>
          <Flex
            px={{ base: "16px", xl: "80px" }}
            py={{ base: "16px", xl: "20px" }}
            justify="space-between"
            alignItems="center"
          >
            <IconButton
              display={{ base: "inline-flex", xl: "none" }}
              variant="full"
              aria-label="Menu"
              boxSize={{ base: "40px", md: "48px" }}
              fontSize={{ base: "20px", md: "24px" }}
              icon={<HamburgerIcon />}
              onClick={() => onOpen()}
            />
            <Flex
              display={{ base: "none", xl: "flex" }}
              columnGap="36px"
              justify="flex-start"
              align="center"
            >
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
                    size={{ base: "md", md: "lg", xl: "md" }}
                    src="https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=620&quality=85&dpr=1&s=none"
                  />
                  <VStack
                    display={{ base: "none", xl: "flex" }}
                    alignItems="flex-start"
                    spacing={0}
                  >
                    <Text fontSize="lg" color="brand.secondary">
                      Francesco
                    </Text>
                    <Text fontSize="sm" color="brand.secondary">
                      Carvelli
                    </Text>
                  </VStack>
                  <Box display={{ base: "none", xl: "flex" }}>
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
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        size={{base: "xs", md: "sm"}}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Flex mt="44px" direction="column" rowGap="12px" align="center">
              {NavLinks.map((link) => (
                <>
                  <Link
                    key={link.name}
                    as={RouterLink}
                    to={link.to}
                    w="full"
                    py="12px"
                    fontSize={{base: "18px", md: "24px"}}
                    fontWeight="bold"
                    color="brand.secondary"
                    letterSpacing="2px"
                  >
                    <HStack justifyContent="center">
                      <Icon as={link.icon} boxSize={6} />
                      <Text>{link.name}</Text>
                    </HStack>
                  </Link>
                  <Divider borderColor="brand.secondary" />
                </>
              ))}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
