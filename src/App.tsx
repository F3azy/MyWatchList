import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/styles/theme";
import "@/styles/global.css";
import RootLayout from "@/_root/RootLayout";
import {
  Home,
  CollectionList,
  Search,
  MovieSerie,
  MovieSerieInfo,
  MyList,
  Random,
  Friends,
} from "@/_root/pages";
import AuthLayout from "@/_auth/AuthLayout";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          {/* <Route index element={<AuthLayout />} /> */}

          {/* private routes */}
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/browse/:media_type" element={<MovieSerie />} />
            <Route path="/info/:media_type/:name/:id" element={<MovieSerieInfo />} />
            <Route path="/myList" element={<MyList />} />
            <Route path="/random" element={<Random />} />
            <Route path="/collection/:name" element={<CollectionList />} />
            <Route path="/friends" element={<Friends />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
