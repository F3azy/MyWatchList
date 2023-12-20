import { Flex, Container } from "@chakra-ui/react";

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <Flex h="100vh" align="center">
      <Container
        display={{ base: "flex", md: "block" }}
        alignItems="center"
        w={{ base: "100%", xl: "25%" }}
        h={{ base: "full", md: "auto" }}
        borderRadius={{ base: "none", md: "16px" }}
        p="16px"
        variant="gradient-with-shadow"
      >
        {children}
      </Container>
    </Flex>
  );
};

export default AuthLayout;
