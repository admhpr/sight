module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    screens: {
      sm: "419px",
      // => @media (min-width: 419px) { ... }

      md: "719px",
      // => @media (min-width: 719px) { ... }

      lg: "959px",
      // => @media (min-width: 9594px) { ... }
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "var(--bg-color)",
      content: "var(--bg-content-color)",
      code: "var(--bg-code)",
      accent: "var(--accent-color)",
    }),
    borderColor: {
      primary: "var(--border-color)",
      accent: "var(--accent-color)",
    },
    extend: {
      colors: {
        primary: "var(--body-color)",
        accent: "var(--accent-color)",
        accenthover: "var(--accent-hover)",
        title: "var(--title-color)",
        bg: "var(--bg-color)",
      },
    },
    fontFamily: {
      sans: [
        "Roboto",
        "Nunito Sans",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: ["Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
      mono: [
        "Menlo",
        "Monaco",
        "Consolas",
        '"Liberation Mono"',
        '"Courier New"',
        "monospace",
      ],
    },
  },
  variants: {},
  plugins: [],
};
