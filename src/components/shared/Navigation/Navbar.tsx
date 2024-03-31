import { Container, Flex } from "@chakra-ui/react";
import NavItemList from "./NavItemList";
import NavMenu from "./NavMenu";

const Navbar = () => {
  return (
    <Flex w="full" position="fixed" top="0" zIndex={1000}>
      <Container minW="full" maxW="full" variant="bottomGradient" p={0}>
        <Flex px="80px" py="20px" justify="space-between" alignItems="center">
          <NavItemList columnGap="36px" justify="flex-start" align="center" />
          <NavMenu />
        </Flex>
      </Container>
    </Flex>
  );
};

export default Navbar;
