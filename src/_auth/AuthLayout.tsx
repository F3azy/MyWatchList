import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Flex, Container } from "@chakra-ui/react";
import SignInForm from "./forms/SignInForm";
import SignUpForm from "./forms/SignUpForm";

const AuthLayout = () => {
  return (
    <>
      <Flex minH="100vh" align="center">
        <Container w="25%" p="16px" variant="gradient-with-shadow">
          <Tabs isFitted variant="dark">
            <TabList>
              <Tab>Sign in</Tab>
              <Tab>Sign up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SignInForm />
              </TabPanel>
              <TabPanel>
                <SignUpForm />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Flex>
    </>
  );
};

export default AuthLayout;
