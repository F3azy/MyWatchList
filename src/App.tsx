import SigningForm from "./components/SigningForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { Flex } from "@chakra-ui/react";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MoviesSeries from "./pages/MoviesSeries";
import MyList from "./pages/My List";
import Random from "./pages/Random";
import Friends from "./pages/Friends";
import CollectionList from "./pages/CollectionList";
import MovieSeriesInfo from "./pages/MovieSeriesInfo";

function App() {

  return (
    <Flex w={{base: "100%"}} minH="100vh" direction="column" align="center">
      <BrowserRouter >
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/movies" element={<MoviesSeries type={"Movies"} />} />
                <Route path="/series" element={<MoviesSeries type={"Series"} />} />
                <Route path="/myList" element={<MyList />} />
                <Route path="/random" element={<Random />} />
                <Route path="/collection/:name" element={<CollectionList />} />
                <Route path="/info/:type/:name/:id" element={<MovieSeriesInfo />} />
                {/* <Route path="/friends" element={<Friends />} /> */}
              </Route>
            </Routes>
      </BrowserRouter >
    </Flex>
  )
}

export default App;