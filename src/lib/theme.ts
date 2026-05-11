import { createTheme } from '@mui/material/styles';

// Bappa Brand Colors (from UI_REVAMP.md)
const bappaRed = '#EB1C24'; // Primary brand red
const bappaBlack = '#000000';
const bappaWhite = '#FFFFFF';
const darkenRed = '#D71920'; // 8% darker for hover states

const theme = createTheme({
  palette: {
    primary: {
      main: bappaRed,
      dark: darkenRed,
      contrastText: bappaWhite,
    },
    secondary: {
      main: bappaBlack,
      contrastText: bappaWhite,
    },
    text: {
      primary: bappaBlack,
      secondary: 'rgba(0, 0, 0, 0.7)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    background: {
      default: bappaWhite,
      paper: bappaWhite,
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    error: {
      main: bappaRed,
    },
  },

  typography: {
    // Body text font family (Lato primary, Montserrat fallback)
    fontFamily: "'Lato', 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",

    // Headlines use Poppins (Playfair Display available as alternative)
    h1: {
      fontFamily: "'Poppins', 'Playfair Display', serif",
      fontWeight: 700,
      fontSize: '3.5rem', // 56px desktop
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      marginTop: 0, // H1 top margin: 0 from spec
      '@media (max-width:600px)': {
        fontSize: '2.25rem', // 36px mobile
      },
    },
    h2: {
      fontFamily: "'Poppins', 'Playfair Display', serif",
      fontWeight: 700,
      fontSize: '2.75rem', // 44px desktop
      lineHeight: 1.3,
      marginTop: '8px', // H2 top margin: 8px from spec
      '@media (max-width:600px)': {
        fontSize: '1.875rem', // 30px mobile
      },
    },
    h3: {
      fontFamily: "'Poppins', 'Playfair Display', serif",
      fontWeight: 600,
      fontSize: '2rem', // 32px desktop
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1.5rem', // 24px mobile
      },
    },
    h4: {
      fontFamily: "'Poppins', 'Playfair Display', serif",
      fontWeight: 600,
      fontSize: '1.5rem', // 24px desktop
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1.25rem', // 20px mobile
      },
    },
    h5: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      fontSize: '1.25rem', // 20px
      lineHeight: 1.5,
      '@media (max-width:600px)': {
        fontSize: '1.125rem', // 18px mobile
      },
    },
    h6: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      fontSize: '1.125rem', // 18px
      lineHeight: 1.5,
      '@media (max-width:600px)': {
        fontSize: '1rem', // 16px mobile
      },
    },

    // Body text (line length 60-75 chars, line height 1.45-1.6)
    body1: {
      fontFamily: "'Lato', 'Montserrat', sans-serif",
      fontSize: '1.125rem', // 18px desktop
      lineHeight: 1.6,
      '@media (max-width:600px)': {
        fontSize: '1rem', // 16px mobile minimum (WCAG requirement)
      },
    },
    body2: {
      fontFamily: "'Lato', 'Montserrat', sans-serif",
      fontSize: '1rem', // 16px
      lineHeight: 1.5,
      '@media (max-width:600px)': {
        fontSize: '1rem', // 16px mobile minimum
      },
    },

    // Button text
    button: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      fontSize: '1rem',
      textTransform: 'none', // No uppercase transformation
      letterSpacing: '0.02em',
    },

    // Subtitle variants
    subtitle1: {
      fontFamily: "'Lato', 'Montserrat', sans-serif",
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontFamily: "'Lato', 'Montserrat', sans-serif",
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.57,
    },

    // Caption/small text
    caption: {
      fontFamily: "'Lato', 'Montserrat', sans-serif",
      fontSize: '0.875rem', // 14px
      lineHeight: 1.5,
    },

    // Overline
    overline: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      lineHeight: 2.66,
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1120, // Desktop max-width from spec (12-column grid)
      xl: 1536,
    },
  },

  spacing: 8, // Base spacing unit (8px)

  shape: {
    borderRadius: 12, // Button border radius from spec
  },

  shadows: [
    'none',
    '0 2px 4px rgba(0, 0, 0, 0.1)',
    '0 4px 8px rgba(0, 0, 0, 0.12)',
    '0 6px 18px rgba(0, 0, 0, 0.15)', // Primary button shadow (index 3)
    '0 8px 24px rgba(0, 0, 0, 0.18)',
    '0 12px 32px rgba(0, 0, 0, 0.2)',
    '0 2px 1px -1px rgba(0,0,0,0.2),0 1px 1px 0 rgba(0,0,0,0.14),0 1px 3px 0 rgba(0,0,0,0.12)',
    '0 3px 1px -2px rgba(0,0,0,0.2),0 2px 2px 0 rgba(0,0,0,0.14),0 1px 5px 0 rgba(0,0,0,0.12)',
    '0 3px 3px -2px rgba(0,0,0,0.2),0 3px 4px 0 rgba(0,0,0,0.14),0 1px 8px 0 rgba(0,0,0,0.12)',
    '0 4px 5px -2px rgba(0,0,0,0.2),0 7px 10px 1px rgba(0,0,0,0.14),0 2px 16px 1px rgba(0,0,0,0.12)',
    '0 5px 5px -3px rgba(0,0,0,0.2),0 8px 10px 1px rgba(0,0,0,0.14),0 3px 14px 2px rgba(0,0,0,0.12)',
    '0 5px 6px -3px rgba(0,0,0,0.2),0 9px 12px 1px rgba(0,0,0,0.14),0 3px 16px 2px rgba(0,0,0,0.12)',
    '0 6px 6px -3px rgba(0,0,0,0.2),0 10px 14px 1px rgba(0,0,0,0.14),0 4px 18px 3px rgba(0,0,0,0.12)',
    '0 6px 7px -4px rgba(0,0,0,0.2),0 11px 15px 1px rgba(0,0,0,0.14),0 4px 20px 3px rgba(0,0,0,0.12)',
    '0 7px 8px -4px rgba(0,0,0,0.2),0 12px 17px 2px rgba(0,0,0,0.14),0 5px 22px 4px rgba(0,0,0,0.12)',
    '0 7px 8px -4px rgba(0,0,0,0.2),0 13px 19px 2px rgba(0,0,0,0.14),0 5px 24px 4px rgba(0,0,0,0.12)',
    '0 7px 9px -4px rgba(0,0,0,0.2),0 14px 21px 2px rgba(0,0,0,0.14),0 5px 26px 4px rgba(0,0,0,0.12)',
    '0 8px 9px -5px rgba(0,0,0,0.2),0 15px 22px 2px rgba(0,0,0,0.14),0 6px 28px 5px rgba(0,0,0,0.12)',
    '0 8px 10px -5px rgba(0,0,0,0.2),0 16px 24px 2px rgba(0,0,0,0.14),0 6px 30px 5px rgba(0,0,0,0.12)',
    '0 8px 11px -5px rgba(0,0,0,0.2),0 17px 26px 2px rgba(0,0,0,0.14),0 6px 32px 5px rgba(0,0,0,0.12)',
    '0 9px 11px -5px rgba(0,0,0,0.2),0 18px 28px 2px rgba(0,0,0,0.14),0 7px 34px 6px rgba(0,0,0,0.12)',
    '0 9px 12px -6px rgba(0,0,0,0.2),0 19px 29px 2px rgba(0,0,0,0.14),0 7px 36px 6px rgba(0,0,0,0.12)',
    '0 10px 13px -6px rgba(0,0,0,0.2),0 20px 31px 3px rgba(0,0,0,0.14),0 8px 38px 7px rgba(0,0,0,0.12)',
    '0 10px 13px -6px rgba(0,0,0,0.2),0 21px 33px 3px rgba(0,0,0,0.14),0 8px 40px 7px rgba(0,0,0,0.12)',
    '0 10px 14px -6px rgba(0,0,0,0.2),0 22px 35px 3px rgba(0,0,0,0.14),0 8px 42px 7px rgba(0,0,0,0.12)',
  ],

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // Smooth scrolling - disabled to prevent interference with dropdown menus
          scrollBehavior: 'auto',
        },
        // Accessibility: Skip link styling
        '#skip-link': {
          position: 'absolute',
          top: '-100px',
          left: '20px',
          backgroundColor: bappaRed,
          color: bappaWhite,
          padding: '12px 24px',
          borderRadius: '4px',
          fontWeight: 600,
          zIndex: 10000,
          textDecoration: 'none',
          '&:focus': {
            top: '20px',
            outline: `3px solid ${bappaBlack}`,
            outlineOffset: '3px',
          },
        },
        // Focus visible styles for keyboard navigation
        '*:focus-visible': {
          outline: `3px solid ${bappaRed}`,
          outlineOffset: '3px',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px', // From spec
          padding: '12px 32px',
          fontSize: '1rem',
          fontWeight: 600,
          boxShadow: '0 6px 18px rgba(0, 0, 0, 0.15)', // From spec
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
          '&:focus-visible': {
            outline: `3px solid ${bappaRed}`,
            outlineOffset: '3px',
          },
          '@media (max-width:600px)': {
            width: '100%', // Full-width on mobile from spec
            padding: '14px 24px',
          },
          '&.MuiButton-containedPrimary': {
            backgroundColor: bappaRed,
            color: bappaWhite,
            '&:hover': {
              backgroundColor: darkenRed,
            },
          },
          '&.MuiButton-containedSecondary': {
            backgroundColor: bappaWhite,
            color: bappaRed,
            border: `2px solid ${bappaRed}`,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(235, 28, 36, 0.08)',
              borderColor: darkenRed,
            },
          },
          '&.MuiButton-outlinedPrimary': {
            borderColor: bappaRed,
            borderWidth: '2px',
            color: bappaRed,
            '&:hover': {
              borderWidth: '2px',
              backgroundColor: 'rgba(235, 28, 36, 0.08)',
            },
          },
        },
        sizeLarge: {
          padding: '14px 40px',
          fontSize: '1.125rem',
        },
      },
    },

    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '20px', // Gutter spacing from spec
          paddingRight: '20px',
          '@media (min-width:1120px)': {
            maxWidth: '1120px', // Desktop max-width from spec
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: bappaWhite,
          color: bappaBlack,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#F5F5F5',
          color: bappaBlack,
          fontWeight: 700,
          fontSize: '1rem',
          padding: '16px',
        },
        body: {
          fontSize: '0.975rem',
          padding: '16px',
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          color: bappaRed,
          textDecoration: 'none',
          transition: 'all 0.2s ease',
          '&:hover': {
            textDecoration: 'underline',
            color: darkenRed,
          },
          '&:focus-visible': {
            outline: `3px solid ${bappaRed}`,
            outlineOffset: '2px',
          },
        },
      },
    },
  },
});

// Custom spacing constants (from spec)
export const sectionSpacing = {
  desktop: '64px',
  mobile: '40px',
};

export const gutterSpacing = {
  mobile: '20px',
  tablet: '24px',
  desktop: '32px',
};

export default theme;
