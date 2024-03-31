import {
  VStack,
  HStack,
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  Icon,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { MenuLinks } from "@/constans/NavItems";
import { getNameAndLastName } from "@/utils";
import NavMenuItem from "./NavMenuItem";
import { useAuth } from "@/contexts/AuthContext";

const NavMenu = () => {
  const { logOut, user } = useAuth();

  async function handleLogOut() {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Menu>
      <MenuButton>
        <HStack>
          <Avatar size="md" src={user?.photoURL as string} />
          <VStack
            alignItems="flex-start"
            spacing={0}
            display={{ base: "none", xl: "flex" }}
          >
            <Text fontSize="lg" color="brand.secondary">
              {getNameAndLastName(user?.displayName)[0]}
            </Text>
            <Text fontSize="sm" color="brand.secondary">
              {getNameAndLastName(user?.displayName)[1]}
            </Text>
          </VStack>
          <Box display={{ base: "none", xl: "block" }}>
            <Icon as={BsChevronDown} color="brand.secondary" />
          </Box>
        </HStack>
      </MenuButton>
      <MenuList>
        {MenuLinks.map((menuLink) => (
          <NavMenuItem
            name={menuLink.name}
            to={menuLink.to}
            icon={menuLink.icon}
            handleLogOut={handleLogOut}
          />
        ))}
      </MenuList>
    </Menu>
  );
};

export default NavMenu;
