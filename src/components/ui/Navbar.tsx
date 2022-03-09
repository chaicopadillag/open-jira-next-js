import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useContext } from 'react';
import { UIContext } from '../../contexts';

export const Navbar = () => {
  const { openSidebar } = useContext(UIContext);
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton size='large' edge='start' onClick={openSidebar}>
          <MenuOutlinedIcon />
        </IconButton>
        <Typography variant='h6'>Open Jira</Typography>
      </Toolbar>
    </AppBar>
  );
};
