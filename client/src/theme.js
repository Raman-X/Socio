// Modernized color tokens
export const colorTokens = {
  grey: {
    0: "#FFFFFD",
    10: "#F9FAFB",
    50: "#F3F4F6",
    100: "#E5E7EB",
    200: "#D1D5DB",
    300: "#9CA3AF",
    400: "#6B7280",
    500: "#4B5563",
    600: "#374151",
    700: "#1F2937",
    800: "#111827",
    900: "#0B1120",
    1000: "#030712",
  },
  primary: {
    50: "#EFF6FF",
    100: "#DBEAFE",
    200: "#BFDBFE",
    300: "#93C5FD",
    400: "#60A5FA",
    500: "#3B82F6", // Main Blue
    600: "#2563EB", // Stronger Blue
    700: "#1D4ED8",
    800: "#1E40AF", // For dark mode highlight
    900: "#1E3A8A",
  },
};

// Modernized MUI Theme with Poppins
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
              light: colorTokens.primary[100],
            },
            neutral: {
              dark: colorTokens.grey[800],
              main: colorTokens.grey[600],
              mediumMain: colorTokens.grey[500],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[100],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 40,
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 32,
        fontWeight: 600,
      },
      h3: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 26,
        fontWeight: 600,
      },
      h4: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 22,
        fontWeight: 500,
      },
      h5: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 18,
        fontWeight: 500,
      },
      h6: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 16,
        fontWeight: 400,
      },
      body1: {
        fontSize: 14,
        fontWeight: 400,
      },
      body2: {
        fontSize: 12,
        fontWeight: 400,
      },
      button: {
        textTransform: "none",
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: "none",
          },
        },
      },
    },
  };
};
