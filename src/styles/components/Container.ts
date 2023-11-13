const ContainerTheme = {
  variants: {
    gradient: {
      borderBottom: "4px solid transparent",
      background:
        "linear-gradient(#141414, #141414) padding-box, linear-gradient(to right, #0B92F0, #0FF4C6) border-box",
    },

    "gradient-with-shadow": {
      borderRadius: "16px",
      border: "4px solid transparent",
      background:
        "linear-gradient(#141414, #141414) padding-box, linear-gradient(to right, #0B92F0, #0FF4C6) border-box",
      filter: "drop-shadow(0 0 100px #0FF4C6)",
    },
  },
};

export default ContainerTheme;
