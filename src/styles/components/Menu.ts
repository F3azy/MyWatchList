import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle({
  button: {
    borderLeftRadius: "full",
  },
  list: {
    border: "#56B4DC solid 1px",
    bg: "#141414",
  },
  item: {
    fontWeight: "bold",
    letterSpacing: "2px",
    color: "#56B4DC",
    bg: "#141414",
    _hover: {
      bg: "#252525",
    },
  },
});

const menuTheme = defineMultiStyleConfig({ baseStyle });

export default menuTheme;
