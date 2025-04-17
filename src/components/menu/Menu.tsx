import { FC, ReactElement, memo } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { PAGE_NAMES } from 'constants/commonConstants';
import { ROUTE_CONSTANTS } from 'constants/routeConstants';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import styles from './menu.module.scss';

const drawerWidth = 240;

interface IMenu {}

const Menu: FC<IMenu> = (): ReactElement => (
  <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {[PAGE_NAMES.TRIPS, PAGE_NAMES.Users, PAGE_NAMES.BUDGETS, PAGE_NAMES.EXPENSES, PAGE_NAMES.SETTINGS].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <NavLink
                  to={
                    index === 0
                      ? ROUTE_CONSTANTS.TRIPS
                      : index === 1
                      ? ROUTE_CONSTANTS.USERS
                      : index === 2
                      ? ROUTE_CONSTANTS.BUDGETS
                      : index === 3
                      ? ROUTE_CONSTANTS.EXPENSES
                      : index === 4
                      ? ROUTE_CONSTANTS.SETTINGS
                      : ''
                  }
                  className={({ isActive }: { isActive: boolean }) =>
                    isActive ? cn(styles.item, styles['item-active']) : styles.item
                  }
                >
                  <ListItemText primary={text} />
                </NavLink>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  </Box>
);

const memorizedMenu = memo(Menu);
export { memorizedMenu as Menu };
