import { drawerAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(drawerAnatomy.keys);

const baseStyle = definePartsStyle({
  closeButton: {
    color: "brand.secondary",
    fontSize: "20px",
  },
  dialog: {
    border: "#56B4DC solid 1px",
    bg: "#141414",
  },
});

const drawerTheme = defineMultiStyleConfig({ baseStyle });

export default drawerTheme;
