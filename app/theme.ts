import { alpha, createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  colorSchemes: {
    dark: true,
  },
  typography: {
    fontFamily: "sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
  },
  shape: {
    borderRadius: "10px",
  },
  components: {
    MuiCard: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.background.paper, 0.42),
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${alpha(theme.palette.common.white, 0.09)}`,
          boxShadow: "0 10px 28px rgba(0, 0, 0, 0.35)",
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.background.paper, 0.38),
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: `1px solid ${alpha(theme.palette.common.white, 0.06)}`,
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.background.paper, 0.42),
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.07)}`,
          boxShadow: "none",
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.background.paper, 0.46),
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderRight: `1px solid ${alpha(theme.palette.common.white, 0.06)}`,
          boxShadow: "none",
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.background.paper, 0.46),
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${alpha(theme.palette.common.white, 0.06)}`,
          borderRadius: 8,
          boxShadow: "none",
        }),
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.background.paper, 0.46),
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${alpha(theme.palette.common.white, 0.06)}`,
          borderRadius: 8,
          boxShadow: "none",
        }),
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.background.paper, 0.46),
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${alpha(theme.palette.common.white, 0.06)}`,
          borderRadius: 8,
          boxShadow: "none",
        }),
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.background.paper, 0.46),
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderTop: `1px solid ${alpha(theme.palette.common.white, 0.06)}`,
          boxShadow: "none",
        }),
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: alpha(theme.palette.common.white, 0.55),
          "&.Mui-selected": {
            color: theme.palette.primary.main,
          },
        }),
      },
    },
    MuiModal: {
      styleOverrides: {
        backdrop: {
          backgroundColor: "rgba(0, 0, 0, 0.48)",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.background.paper, 0.28),
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderRadius: 10,
        }),
      },
    },
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#0a0a0a',
    },
    primary: {
      main: '#eece1a',
    },
    secondary: {
      main: '#0a167e',
    },
    text: {
      primary: '#E6EDF3',
      secondary: '#8B949E',
    },
  },
});

export default theme;