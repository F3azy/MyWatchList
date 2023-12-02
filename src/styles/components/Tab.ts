import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

const darkVariant = definePartsStyle({
  tab: {
    border: "2px solid",
    borderColor: "transparent",
    fontWeight: "bold",
    bg: "#56B4DC",
    color: "#141414",
    borderTopRadius: "12px",
    borderBottom: "none",
    _selected: {
      bg: "#141414",
      color: "#56B4DC",
      borderColor: "inherit",
      borderBottom: "none",
      mb: "-2px",
      _hover: {
        bg: "#141414",
      },
    },
    _hover: {
      bg: "#0B92F0",
    },
  },
  tablist: {
    borderColor: "#363636",
  },
  tabpanel: {
    border: "2px solid",
    borderColor: "#363636",
    borderBottomRadius: "12px",
  },
});

const mediaInfoVariant = definePartsStyle({
  tab: {
    fontWeight: "semibold",
    letterSpacing: "1px",
    _selected: {
      color: "brand.secondary",
      borderBottom: "4px solid",
      borderColor: "brand.secondary",
      mb: '-4px'
    },
  },
  tablist: {
    borderBottom: "4px solid",
    borderColor: "inherit",
  },
});

const mediaInfoSeasonsVariant = definePartsStyle({
  tab: {
    fontWeight: "semibold",
    letterSpacing: "1px",
    _selected: {
      color: "brand.secondary",
    },
  },
});

const variants = {
  dark: darkVariant,
  brandColor: mediaInfoVariant,
  seasons: mediaInfoSeasonsVariant,
};

const TabsTheme = defineMultiStyleConfig({ variants });

export default TabsTheme;
