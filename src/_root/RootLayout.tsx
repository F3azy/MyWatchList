import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import DisplayNav from "@/components/shared/Navigation/DisplayNav";

const RootLayout = () => {
  return (
    <>
      <DisplayNav />
      <Box
        px={{ base: "16px", xl: "80px" }}
        pt={{ base: "96px", md: "112px", xl: "116px" }}
        pb={{base: "16px", xl: "28px"}}
        minH="calc(100vh)"
      >
        <Outlet />
      </Box>
    </>
  );
};

export default RootLayout;
