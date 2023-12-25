import { Flex, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Flex minH="100vh" align="center">
      <Container
        display={{ base: "flex", md: "block" }}
        alignItems={{ base: "center", md: "" }}
        maxW={{base: "full", md: "55%", xl: "40%", '2xl': "30%"}}
        minH={{ base: "100vh", md: "auto" }}
        borderRadius={{ base: "none", md: "16px" }}
        p="16px"
        variant="gradient-with-shadow"
      >
        <Outlet />
      </Container>
    </Flex>
  );
};

export default AuthLayout;
