import { createTheme } from '@mui/material/styles';

const bappaRed = '#EB1C24';
const bappaBlack = '#000000';
const bappaWhite = '#FFFFFF';
const darkenRed = '#D71920';

const theme = createTheme({
  palette: {
    primary: { main: bappaRed, dark: darkenRed, contrastText: bappaWhite },
    secondary: { main: bappaBlack, contrastText: bappaWhite },
    text: { primary: bappaBlack, secondary: 'rgba(0,0,0,0.7)' },
    background: { default: bappaWhite, paper: bappaWhite },
    error: { main: bappaRed },
  },
  typography: {
    fontFamily: "'Lato', 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: {
      fontFamily: "'Poppins', serif",
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      '@media (max-width:600px)': { fontSize: '2.25rem' },
    },
    h2: {
      fontFamily: "'Poppins', serif",
      fontWeight: 700,
      fontSize: '2.75rem',
      lineHeight: 1.3,
      '@media (max-width:600px)': { fontSize: '1.875rem' },
    },
    h3: {
      fontFamily: "'Poppins', serif",
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.4,
      '@media (max-width:600px)': { fontSize: '1.5rem' },
    },
    h4: {
      fontFamily: "'Poppins', serif",
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      '@media (max-width:600px)': { fontSize: '1.25rem' },
    },
    h5: { fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.5 },
    h6: { fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '1.125rem', lineHeight: 1.5 },
    body1: { fontFamily: "'Lato', sans-serif", fontSize: '1.125rem', lineHeight: 1.6 },
    body2: { fontFamily: "'Lato', sans-serif", fontSize: '1rem', lineHeight: 1.5 },
    button: { fontFamily: "'Poppins', sans-serif", fontWeight: 600, textTransform: 'none' },
  },
  breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1120, xl: 1536 } },
  spacing: 8,
  shape: { borderRadius: 12 },
});

export default theme;
