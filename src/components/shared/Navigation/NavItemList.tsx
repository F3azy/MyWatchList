import { Flex, FlexProps } from "@chakra-ui/react";
import NavItem from "./NavItem";
import { NavLinks } from "@/constans/NavItems";

const NavItemList = (props: FlexProps) => {
  return (
    <Flex {...props}>
      {NavLinks.map((link) => (
        <NavItem
          key={link.name}
          name={link.name}
          to={link.to}
          icon={link.icon}
        />
      ))}
    </Flex>
  );
};

export default NavItemList;
