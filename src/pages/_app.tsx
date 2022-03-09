import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from '../themes';
import { UIProvider } from '../contexts';

function OpenJiraApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <UIProvider>
        <Component {...pageProps} />
      </UIProvider>
    </ThemeProvider>
  );
}

export default OpenJiraApp;
