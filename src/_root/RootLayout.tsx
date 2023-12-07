import { Flex } from "@chakra-ui/react";
import Navbar from "@/components/shared/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Flex px="80px" py="28px" minH="calc(100vh - 92px)">
        <Outlet />
      </Flex>
    </>
  );
};

export default RootLayout;
