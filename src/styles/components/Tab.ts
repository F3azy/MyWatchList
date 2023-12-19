import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

const mediaInfoVariant = definePartsStyle({
  tab: {
    px: {base: "8px", xl: "16px"},
    py: {base: "4px", xl: "8px"},
    fontSize: {base: "15px", md: "16px"},
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
  brandColor: mediaInfoVariant,
  seasons: mediaInfoSeasonsVariant,
};

const TabsTheme = defineMultiStyleConfig({ variants });

export default TabsTheme;
