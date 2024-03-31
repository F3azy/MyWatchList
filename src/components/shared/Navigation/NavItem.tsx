import { LinkItem } from "@/constans/NavItems";
import { HStack, Icon, Link, LinkProps, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

type NavItemProps = LinkItem & LinkProps;

const NavItem = ({ name, to, icon, ...rest }: NavItemProps) => {
  return (
    <Link
      as={RouterLink}
      to={to}
      fontSize="18px"
      fontWeight="bold"
      color="brand.secondary"
      letterSpacing="2px"
      {...rest}
    >
      <HStack justifyContent="center">
        <Icon as={icon} boxSize={{ base: 6, xl: 5 }} />
        <Text>{name}</Text>
      </HStack>
    </Link>
  );
};

export default NavItem;
