import {
  Container,
  Flex,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import MobileNavItemList from "./MobileNavItemList";
import NavMenu from "./NavMenu";

const MobileNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex w="full" position="fixed" top="0" zIndex={1000}>
        <Container minW="full" maxW="full" variant="bottomGradient" p={0}>
          <Flex px="16px" py="16px" justify="space-between" alignItems="center">
            <IconButton
              variant="full"
              aria-label="Menu"
              boxSize={{ base: "40px", md: "48px" }}
              fontSize={{ base: "20px", md: "24px" }}
              icon={<HamburgerIcon />}
              onClick={() => onOpen()}
            />
            <NavMenu />
          </Flex>
        </Container>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        size={{ base: "xs", md: "sm" }}
        blockScrollOnMount={true}
        variant="menu"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <MobileNavItemList
              mt="44px"
              direction="column"
              rowGap="12px"
              align="center"
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNav;
