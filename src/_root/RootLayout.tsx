import { Flex } from "@chakra-ui/react";
import Navbar from "@/components/shared/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Flex px={{ base: "16px", xl: "80px" }} py={{ base: "16px", xl: "28px" }}>
        <Outlet />
      </Flex>
    </>
  );
};

export default RootLayout;
