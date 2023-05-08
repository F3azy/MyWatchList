import { Icon, Link, HStack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { LinkItemProps } from '../NavItemProps';


const NavItem = ({name, to, icon} : LinkItemProps) => {
  return (
    <Link as={RouterLink} to={to} fontSize="18px" fontWeight="bold" color="brand.secondary" letterSpacing="2px">
      <HStack><Icon as={icon} boxSize={5}/><Text>{name}</Text></HStack>
    </Link>
  )
};

export default NavItem;