import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/styles/theme";
import "@/styles/global.css";
import RootLayout from "@/_root/RootLayout";
import {
  Home,
  CollectionList,
  Search,
  Browse,
  MediaInfo,
  MyList,
  RandomMedia,
  Friends,
} from "@/_root/pages";
import AuthProvider from "./contexts/AuthContext";
import SignInForm from "./_auth/forms/SignInForm";
import SignUpForm from "./_auth/forms/SignUpForm";
import ResetPassword from "./_auth/forms/ResetPassword";
import PrivateRoutes from "./components/auth/PrivateRoutes";
import PublicRoute from "./components/auth/PublicRoute";
import VerifyEmail from "./_auth/forms/VerifyEmail";
import PageNotFound from "./_error/PageNotFound";
import AuthLayout from "./_auth/AuthLayout";
import ChooseFavGenre from "./_auth/forms/ChooseFavGenre";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* public routes */}
            <Route
              element={
                <PublicRoute>
                  <AuthLayout />
                </PublicRoute>
              }
            >
              <Route path="/signin" element={<SignInForm />} />
              <Route path="signup" element={<SignUpForm />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            {/* private routes */}
            <Route
              path="/"
              element={
                <PrivateRoutes>
                  <RootLayout />
                </PrivateRoutes>
              }
            >
              <Route index element={<Home />} />
              <Route path="/collection/:name" element={<CollectionList />} />
              <Route path="/search" element={<Search />} />
              <Route path="/browse/:media_type" element={<Browse />} />
              <Route path="/myList" element={<MyList />} />
              <Route path="/random" element={<RandomMedia />} />
              <Route path="/friends" element={<Friends />} />
              <Route
                path="/info/:media_type/:id/:name"
                element={<MediaInfo />}
              />
            </Route>

            {/* private forms routes */}
            <Route
              element={
                <PrivateRoutes>
                  <AuthLayout />
                </PrivateRoutes>
              }
            >
              <Route path="/verify" element={<VerifyEmail />} />
              <Route path="/favorite-genre" element={<ChooseFavGenre />} />
            </Route>

            {/*404 error page*/}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
