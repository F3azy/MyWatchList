import { Flex } from "@chakra-ui/react";
import Navbar from "@/components/shared/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Flex minW="100%" flex={1} px="80px" py="28px">
        <Outlet />
      </Flex>
    </>
  );
};

export default RootLayout;
