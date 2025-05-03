// Updated color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#FAFAFA",
    50: "#F5F5F5",
    100: "#E5E5E5",
    200: "#CCCCCC",
    300: "#B3B3B3",
    400: "#999999",
    500: "#808080",
    600: "#666666",
    700: "#4D4D4D",
    800: "#333333",
    900: "#1A1A1A",
    1000: "#0D0D0D",
  },
  primary: {
    50: "#EAF4FF",
    100: "#D6EFFF",
    200: "#ADDFFF",
    300: "#85CEFF",
    400: "#5CBFFF",
    500: "#33B0FF", // Main
    600: "#008DE0", // Dark
    700: "#006FB3",
    800: "#004C80", // Light in dark mode
    900: "#002640",
  },
};

// Updated MUI theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[800],
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[300],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[500],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[800],
            },
          }
        : {
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            neutral: {
              dark: colorTokens.grey[800],
              main: colorTokens.grey[600],
              mediumMain: colorTokens.grey[500],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[100],
            },
            background: {
              default: colorTokens.grey[50],
              alt: colorTokens.grey[10],
            },
          }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 42,
        fontWeight: 600,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 34,
        fontWeight: 600,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 26,
        fontWeight: 500,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 22,
        fontWeight: 500,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 18,
        fontWeight: 500,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
        fontWeight: 400,
      },
    },
  };
};
