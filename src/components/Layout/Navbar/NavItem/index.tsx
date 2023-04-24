import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { To } from "react-router-dom";

const NavItem = ({page, to} : {page: String, to: To}) => {
  return (
    <Link as={RouterLink} to={to} fontSize={"24px"} fontWeight={"bold"} color={"brand.secondary"} letterSpacing={"2px"}>
      {page}
    </Link>
  )
};

export default NavItem;