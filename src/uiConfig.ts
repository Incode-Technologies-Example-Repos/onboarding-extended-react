export const v2UiConfig = {
  branding: {
    hideFooterBranding: true,
    // logo: "https://...." // opcional
  },
  theming: {
    designTokens: {
      colors: {
        brand: {
          500: "#4F46E5",
          600: "#4338CA",
        },
      },
      button: {
        primary: {
          surface: {
            default: "#4F46E5",
            hover: "#4338CA",
          },
          text: {
            default: "#FFFFFF",
          },
        },
      },
      typography: {
      },
    },
  },
} as const;
