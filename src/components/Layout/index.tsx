import { Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <>
        <Navbar />
        <Flex minW={"100%"} px={"80px"} py={"28px"}>
            <Outlet />
        </Flex>
    </>
  )
};

export default Layout;