import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Flex, Container  } from '@chakra-ui/react';
import Form from './Form'

const SigningForm = () => {
  return (
    // <Flex w={{base: "100%"}} minH={"100vh"} justify={"center"} align={"center"}>
        <Container w={"25%"} p={"16px"} variant='gradient-with-shadow'>
          <Tabs isFitted variant='dark'>
              <TabList>
                  <Tab>Sign in</Tab>
                  <Tab>Sign up</Tab>
              </TabList>
              <TabPanels>
                  <TabPanel>
                    <Form SignIn={true} />
                  </TabPanel>
                  <TabPanel>
                    <Form SignIn={false} />
                  </TabPanel>
              </TabPanels>
          </Tabs>
        </Container >
    // </Flex>
  )
};

export default SigningForm;