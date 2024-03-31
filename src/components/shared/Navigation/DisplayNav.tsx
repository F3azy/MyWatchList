import { useMediaQuery } from "@chakra-ui/react";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";

const DisplayNav = () => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1279px)");

  if (isLargerThan1280) return <Navbar />;

  return <MobileNav />;
};

export default DisplayNav;
