"use client"
import { useState } from 'react';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import AddIcon from '@mui/icons-material/Add';
import ShelvesIcon from '@mui/icons-material/Shelves';
import { useSearchParams } from 'next/navigation'

export default function MenuContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const mainListItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, link: '/dashboard' },
    { text: 'Manage Team', icon: <PeopleRoundedIcon />, link: '/dashboard/register' },
    { text: 'Schedule', icon: <CalendarMonthIcon />, link: '' },
    { text: 'Manage Inventory', icon: <ShelvesIcon />, link: '' },
    { text: 'Create Item', icon: <AddIcon />, link: `dashboard/post/${userId}` },
    { text: 'Return to Homepage', icon: <KeyboardReturnIcon />, link: "/" }
  ];

  const secondaryListItems = [
    { text: 'Settings', icon: <SettingsRoundedIcon /> },
    { text: 'About', icon: <InfoRoundedIcon /> },
    { text: 'Feedback', icon: <HelpRoundedIcon /> },
  ];

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem selected={selectedIndex === index} key={index} disablePadding sx={{ display: 'block', marginBottom: 1, ":hover": { backgroundColor: 'rgba(0, 0, 0, 0.08)' } }}>
            <Link href={item.link}>
              <ListItemButton selected={selectedIndex === index} onClick={() => setSelectedIndex(index)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
