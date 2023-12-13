import { Box } from "@chakra-ui/react";
import Navbar from "@/components/shared/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Box px={{ base: "16px", xl: "80px" }} py={{ base: "16px", xl: "28px" }}>
        <Outlet />
      </Box>
    </>
  );
};

export default RootLayout;
