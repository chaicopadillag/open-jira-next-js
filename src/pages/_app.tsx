import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from '../themes';
import { EntryProvider, UIProvider } from '../contexts';

function OpenJiraApp({ Component, pageProps }: AppProps) {
  return (
    <EntryProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntryProvider>
  );
}

export default OpenJiraApp;
