import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import { MainLayout } from '../components/layouts/MainLayout';

const Homepage: NextPage = () => {
  return (
    <MainLayout>
      <Typography variant='h1'>Hello Next.js 👋</Typography>
    </MainLayout>
  );
};

export default Homepage;
