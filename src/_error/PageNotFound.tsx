import { useAuth } from "@/contexts/AuthContext";
import { Flex, Heading, VStack, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const PageNotFound = () => {
  const { user } = useAuth();

  return (
    <Flex direction="column" h="100vh" justify="center" align="center" p="16px">
      <VStack spacing={10}>
        <VStack>
          <Heading
            as="h1"
            fontSize="200px"
            fontWeight="semibold"
            lineHeight={1}
          >
            404
          </Heading>
          <Heading as="h2" fontWeight="semibold" textAlign="center">
            Page not found, are u lost?
          </Heading>
        </VStack>
        <Link
          as={RouterLink}
          to={user ? "/" : "/signin"}
          color="brand.secondary"
          textDecoration="underline"
          fontSize="24px"
        >
          Let us help you find your way.
        </Link>
      </VStack>
    </Flex>
  );
};

export default PageNotFound;
