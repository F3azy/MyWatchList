import { Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <>
    {/* <Flex w={{base: "100%"}} minH={"100vh"} justify={"center"} align={"center"}> */}
        <Navbar />
        <Flex minH={"95vh"} w={"100%"} border={"red solid 1px"}>
            <Outlet />
        </Flex>
    {/* </Flex> */}
    </>
  )
};

export default Layout;