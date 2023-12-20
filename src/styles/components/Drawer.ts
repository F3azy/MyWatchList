import { drawerAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(drawerAnatomy.keys);

const menu = definePartsStyle({
  closeButton: {
    color: "brand.secondary",
    fontSize: "20px",
  },
  dialog: {
    border: "#56B4DC solid 1px",
    bg: "#141414",
  },
});

const brandVariant = definePartsStyle({
  closeButton: {
    color: "brand.secondary",
    fontSize: "20px",
  },
  dialog: {
    border: "4px solid transparent",
    background:
      "linear-gradient(#141414, #141414) padding-box, linear-gradient(to right, #0B92F0, #0FF4C6) border-box",
  },
});

const variants = {
  menu : menu,
  brand: brandVariant,
}

const drawerTheme = defineMultiStyleConfig({ variants });

export default drawerTheme;
