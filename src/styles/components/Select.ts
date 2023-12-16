import { selectAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys);

const base = definePartsStyle({
  field: {
    background: "#141414",
    border: "1px solid",
    borderColor: "#56B4DC",
    borderRadius: "md",
    color: "#F0F0F0",
  },
  icon: {
    color: "#56B4DC",
  },
});

const SelectTheme = defineMultiStyleConfig({
  variants: { base },
});

export default SelectTheme;
