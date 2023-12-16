import { Box } from "@chakra-ui/react";
import Navbar from "@/components/shared/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Box
        px={{ base: "16px", xl: "80px" }}
        pt={{ base: "96px", md: "112px", xl: "116px" }}
        pb={{base: "16px", xl: "28px"}}
        h="calc(100vh)"
      >
        <Outlet />
      </Box>
    </>
  );
};

export default RootLayout;
