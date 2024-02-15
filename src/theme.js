import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#21639C",
    },
    background: {
      default: "rgb(244, 244, 241)",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: "40px",
          color: "#21639C",
          letterSpacing: "0.8px",
          textAlign: "center",
          lineHeight: "56px",
          fontWeight: "bold",
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "submit" },
          style: {
            textTransform: "none",
            backgroundImage:
              "linear-gradient(180deg, #1C4E86 1%, #194475 100%)",
            border: "1px solid #10345C",
            boxShadow: "inset 1px 1px 0 0 #2D68A9",
            borderRadius: "4px",
            width: 192,
            fontWeight: "bold",
            color: "#F8F8F8",
            fontSize: 24,
          },
        },
      ],
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          height: 64,
          width: 192,
          boxSizing: "border-box",
          fontWeight: "bold",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: 64,
          width: 192,
          boxSizing: "border-box",
          background: "#FFFFFF",
          backgroundImage: "linear-gradient(180deg, #F5F5F5 0%, #FFFFFF 100%)",
          boxShadow: "inset 1px 1px 0 0 rgba(255,255,255,0.80)",
          borderRadius: "4px",
          border: "1px solid #E0E0D7",
          fontSize: 24,
        },
      },
    },
  },
});
