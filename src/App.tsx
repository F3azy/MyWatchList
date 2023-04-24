import SigningForm from "./components/SigningForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { Flex } from "@chakra-ui/react";
import Home from "./pages/Home";
import Search from "./pages/Search";

function App() {

  return (
    <Flex w={{base: "100%"}} minH={"100vh"} justify={"space-evenly"} align={"center"}>
      <BrowserRouter >
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/search" element={<Search />} />
              </Route>
            </Routes>
      </BrowserRouter >
    </Flex>
  )
}

export default App;