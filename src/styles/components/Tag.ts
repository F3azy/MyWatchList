import { tagAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tagAnatomy.keys);

const outline = definePartsStyle({
  container: {
    border: "1px solid",
    borderColor: "#56B4DC",
    p: "8px",
    color: "#56B4DC",
    fontSize: "15px",
    letterSpacing: "1px",
    boxShadow: "none",
    _hover: {
      cursor: "pointer",
    },
  },
});

const selectedVariant = definePartsStyle({
  container: {
    bg: "#56B4DC",
    p: "8px",
    color: "#141414",
    fontSize: "15px",
    letterSpacing: "1px",
    boxShadow: "none",
    _hover: {
      cursor: "pointer",
    },
  },
});

const variants = {
  outline: outline,
  selected: selectedVariant,
};

const TagTheme = defineMultiStyleConfig({ variants });

export default TagTheme;
