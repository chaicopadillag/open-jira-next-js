import { InboxOutlined, MailOutlined } from '@mui/icons-material';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext } from 'react';
import { UIContext } from '../../contexts';

const menuItems: string[] = ['Inbox', 'Starred', 'Send email', 'Drafts'];

export const Sidebar = () => {
  const { sidebarIsOpen, closeSidebar } = useContext(UIContext);

  return (
    <Drawer anchor='left' open={sidebarIsOpen} onClose={closeSidebar}>
      <Box
        sx={{
          width: 250,
        }}
      >
        <Box sx={{ padding: '5px 10px' }}>
          <Typography variant='h6'>Menu</Typography>
        </Box>
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={item}>
              <ListItemIcon>{index % 2 === 0 ? <InboxOutlined /> : <MailOutlined />}</ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={item}>
              <ListItemIcon>{index % 2 === 0 ? <InboxOutlined /> : <MailOutlined />}</ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
