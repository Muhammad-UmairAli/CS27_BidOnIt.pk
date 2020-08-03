import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';
import SideBarBuyer from './SideBarBuyer';
import BuyerDashboard from './BuyerDashboard';
import BuyerProfile from './BuyerProfile';
import BuyerViewPkgs from './BuyerViewPkgs';
import Cart from './cart';
import Orders from './orders';
import ViewBiddings from './BuyerViewBiddings';
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

const Buyer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SideBarBuyer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route path="/buyer/dashboard" component={BuyerDashboard} />
        <Route path="/buyer/view-pkgs" component={BuyerViewPkgs} />
        <Route path="/buyer/profile" component={BuyerProfile} />
        <Route path="/buyer/cart" component={Cart} />
        <Route path="/buyer/orders" component={Orders} />
        <Route path="/buyer/my-biddings-products/" component={ViewBiddings} />
      </main>
    </div>
  );
};

export default Buyer;