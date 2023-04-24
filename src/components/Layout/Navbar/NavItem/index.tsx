import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const NavItem = ({page, to} : {page: String, to: String}) => {
  return (
    <Link as={RouterLink} to="/" fontSize={"24px"} fontWeight={"bold"} color={"brand.secondary"} letterSpacing={"2px"}>{page}</Link>
  )
};

export default NavItem;