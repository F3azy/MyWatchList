import { LinkItem } from "@/constans/NavItems";
import { HStack, Text, MenuItem, Icon, MenuDivider } from "@chakra-ui/react";
import { Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";

type NavMenuItemProps = { handleLogOut: () => void } & LinkItem;

const NavMenuItem = ({ name, to, icon, handleLogOut }: NavMenuItemProps) => {
  if (name === "Log Out")
    return (
      <Fragment key={name}>
        <MenuDivider />
        <MenuItem onClick={() => handleLogOut()}>
          <HStack>
            <Icon as={icon} />
            <Text>{name}</Text>
          </HStack>
        </MenuItem>
      </Fragment>
    );

  return (
    <MenuItem as={RouterLink} to={to}>
      <HStack>
        <Icon as={icon} />
        <Text>{name}</Text>
      </HStack>
    </MenuItem>
  );
};

export default NavMenuItem;
