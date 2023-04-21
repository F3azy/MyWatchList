import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tabsAnatomy.keys);

const darkVariant = definePartsStyle({
      tab: {
        border: '2px solid',
        borderColor: 'transparent',
        fontWeight: "bold",
        bg: "#56B4DC",
        color: "#141414",
        borderTopRadius: '12px',
        borderBottom: 'none',
        _selected: {
          bg: '#141414',
          color: "#56B4DC",
          borderColor: 'inherit',
          borderBottom: 'none',
          mb: '-2px',
        },
      },
      tablist: {
        borderBottom: '2x solid',
        borderColor: '#363636',
      },
      tabpanel: {
        border: '2px solid',
        borderColor: '#363636',
        borderBottomRadius: '12px',
      },
  });

const variants = {
  'dark': darkVariant,
};

export const TabsTheme = defineMultiStyleConfig({variants});