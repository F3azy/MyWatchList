import { Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <>
    {/* <Flex w={{base: "100%"}} minH={"100vh"} justify={"center"} align={"center"}> */}
        <Navbar />
        <Flex>
            <Outlet />
        </Flex>
    {/* </Flex> */}
    </>
  )
};

export default Layout;