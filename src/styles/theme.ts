import { extendBaseTheme } from "@chakra-ui/react";

const Styles = {
    global: {
        body: {
            bg: "#141414",
            minH: "100vh",
            color: "#F0F0F0",
        },
        html: {
            bg: "#141414",
            minH: "100vh",
        },
    }, 
};

export const theme = extendBaseTheme({
    styles: Styles,
});