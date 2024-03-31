import { Divider, Flex, FlexProps } from "@chakra-ui/react";
import NavItem from "./NavItem";
import { Fragment } from "react";
import { NavLinks } from "@/constans/NavItems";

const MobileNavItemList = ({ ...props }: FlexProps) => {
  return (
    <Flex {...props}>
      {NavLinks.map((link) => (
        <Fragment key={link.name}>
          <NavItem
            key={link.name}
            name={link.name}
            to={link.to}
            icon={link.icon}
            w="full"
            py="12px"
          />
          <Divider borderColor="brand.secondary" />
        </Fragment>
      ))}
    </Flex>
  );
};

export default MobileNavItemList;
