import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';
import SellerDashboard from './SellerDashboard';
import SideBarSeller from './SideBarSeller';
import SellerForm from './SellerForm';
import SellerViewProducts from './SellerViewProducts';
import SellerViewBiddings from './SellerViewBiddings';
import SellerProfile from './SellerProfile';
import Orders from './orders';
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

const SellerNew = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SideBarSeller />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route path="/seller/dashboard" component={SellerDashboard} />
        <Route path="/seller/products/:id" component={SellerForm} />
        <Route path="/seller/view-products" component={SellerViewProducts} />
        <Route path="/seller/filter-view-products/:type" component={SellerViewProducts} />
        <Route path="/seller/filter-view-biddings/:type" component={SellerViewBiddings} />
        <Route path="/seller/profile" component={SellerProfile} />
        <Route path="/seller/orders" component={Orders} />
      </main>
    </div>
  );
};

export default SellerNew;

