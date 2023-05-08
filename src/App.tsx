import SigningForm from "./components/SigningForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { Flex } from "@chakra-ui/react";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Movies_Series from "./pages/Movies_Series";
import MyList from "./pages/My List";
import Random from "./pages/Random";
import Friends from "./pages/Friends";

function App() {

  return (
    <Flex w={{base: "100%"}} minH="100vh" direction="column" align="center">
      <BrowserRouter >
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/movies" element={<Movies_Series title={"Movies"} />} />
                <Route path="/series" element={<Movies_Series title={"Series"} />} />
                <Route path="/myList" element={<MyList />} />
                <Route path="/random" element={<Random />} />
                {/* <Route path="/friends" element={<Friends />} /> */}
              </Route>
            </Routes>
      </BrowserRouter >
    </Flex>
  )
}

export default App;