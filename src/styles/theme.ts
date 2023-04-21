import { extendTheme } from "@chakra-ui/react";
import Container from "./Container";
import { TabsTheme } from "./Tabs";

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

const Colors = {
    brand: {
        primary: '#0B92F0',
        secondary: '#56B4DC',
        tertiary: '#0FF4C6',
        dark: '#141414',
        light: '#F0F0F0',
    }
};

const Components = {
    Container: Container,
    Tabs: TabsTheme,
};

export const theme = extendTheme({
    styles: Styles,
    colors: Colors,
    components: Components,
});