import { Box } from '@mui/material';
import Head from 'next/head';
import { FC } from 'react';
import { Navbar } from '../ui';

type MainLayoutProps = {
  title?: string;
};

export const MainLayout: FC<MainLayoutProps> = ({ children, title = 'Open Jira' }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <Box sx={{ padding: '10px 20px' }}>{children}</Box>
    </Box>
  );
};
