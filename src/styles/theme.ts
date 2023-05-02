import { extendTheme } from "@chakra-ui/react";
import ContainerTheme from "./componentsVar/Container";
import { TabsTheme } from "./componentsVar/Tabs";
import ButtonTheme from "./componentsVar/Buttons";
import { menuTheme } from "./componentsVar/Menus";

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
        dark: {
            base: '#141414',
            600: "#3c3c3c",
            700: "#1f1f1f",
            800: "#131313",
        },
        light: '#F0F0F0',
    }
};

const Components = {
    Container: ContainerTheme,
    Tabs: TabsTheme,
    Button: ButtonTheme,
    Menu: menuTheme,
};

export const theme = extendTheme({
    styles: Styles,
    colors: Colors,
    components: Components,
});