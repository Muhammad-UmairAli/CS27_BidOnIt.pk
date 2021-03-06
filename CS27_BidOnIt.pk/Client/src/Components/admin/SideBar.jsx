import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MessageIcon from '@material-ui/icons/Message';
import DashboardIcon from '@material-ui/icons/Dashboard';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import AddIcon from '@material-ui/icons/Add';
import CategoryIcon from '@material-ui/icons/Category';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export default function SideBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap>
            DASHBOARD
          </Typography>
          <Link class="logoutLink" to="/">
                    Home{' '}
              <i className="fa fa-home ml-1" aria-hidden="true"></i>
            </Link>
          <Link class="logoutLink" to="/logout">
                    Logout{' '}
              <i className="fa fa-sign-out ml-1" aria-hidden="true"></i>
            </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="Dashboard">
            <Link to="/admin/dashboard">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              Dashboard
            </Link>
          </ListItem>
          <ListItem button key="View Users">
            <Link to="/admin/view-users">
              <ListItemIcon>
                <AccessibilityIcon />
              </ListItemIcon>
              View Users
            </Link>
          </ListItem>
          <ListItem button key="View Sellers">
          <Link to="/admin/view-sellers">
            <ListItemIcon>
              <AccessibilityIcon />
            </ListItemIcon>
            View Sellers
          </Link>
          </ListItem>
          <ListItem button key="View Packages">
          <Link to="/admin/view-pkgs">
            <ListItemIcon>
              <AccountBalanceWalletIcon />
            </ListItemIcon>
            View Packages
          </Link>
          </ListItem>
          <ListItem button key="View Categories">
          <Link to="/admin/view-categories">
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            View Categories
          </Link>
          </ListItem>
          <ListItem button key="Add Products">
            <Link to="/admin/products/new">
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              Add Products
            </Link>
          </ListItem>
          <ListItem button key="View Products">
            <Link to="/admin/view-products">
              <ListItemIcon>
                <VisibilityIcon />
              </ListItemIcon>
              View Products
            </Link>
          </ListItem>
          <ListItem button key="View messages">
            <Link to="/admin/user-messages">
              <ListItemIcon>
                <MessageIcon />
              </ListItemIcon>
              View Messages
            </Link>
          </ListItem>
          <ListItem button key="Profile">
            <Link to="/admin/profile">
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              Profile
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
