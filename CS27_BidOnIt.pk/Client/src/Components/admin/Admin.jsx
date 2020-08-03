import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';

import SideBar from './SideBar';
import Dashboard from './AdminDashboard';
import AdminForm from './AdminForm';
import ViewProducts from './AdminViewProducts';
import ViewBiddings from './AdminViewBiddings';
import AdminProfile from './AdminProfile';
import ViewUsers from './ViewUsers';
import ViewSellers from './ViewSellers';
import AdminViewPkgs from './AdminViewPkgs';
import AdminViewCats from './AdminViewCats';
import ViewUserPacks from './ViewUserPacks';
import Orders from './orders';
import AdminViewMessages from './AdminViewMessages';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
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

const Admin = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SideBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route path="/admin/dashboard" component={Dashboard} />
        <Route path="/admin/products/:id" component={AdminForm} />
        <Route path="/admin/view-products" component={ViewProducts} />
        <Route path="/admin/filter-view-products/:type" component={ViewProducts} />
        <Route path="/admin/filter-view-biddings/:type" component={ViewBiddings} />
        <Route path="/admin/profile" component={AdminProfile} />
        <Route path="/admin/view-users" component={ViewUsers} />
        <Route path="/admin/view-sellers" component={ViewSellers}/>
        <Route path="/admin/view-pkgs" component={AdminViewPkgs}/>
        <Route path="/admin/view-categories" component={AdminViewCats}/>
        <Route path="/admin/orders" component={Orders} />
        <Route path="/admin/user-packs" component={ViewUserPacks} />
        <Route path="/admin/user-messages" component={AdminViewMessages} />
      </main>
    </div>
  );
};

export default Admin;
