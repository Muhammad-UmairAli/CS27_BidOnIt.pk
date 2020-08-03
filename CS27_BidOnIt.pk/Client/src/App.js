import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import auth from './Services/authService';

import NavBar from './Components/navbar';
import Home from './Components/home';
import Footer from './Components/footer';
import Products from './Components/products';
import SingleProduct from './Components/singleProduct';
import NotFound from './Components/notFound';
import Login from './Components/login';
import Register from './Components/register';
import ProductForm from './Components/productForm';
import Logout from './Components/logout';
import ContactUs from './Components/contactus';
import Sell from './Components/sell';
import Buy from './Components/buy';
import HowTOBid from './Components/howtobid';
import AboutUs from './Components/aboutus';
import ProtectedRoute from './Components/common/protectedRoute';

import Buyer from './Components/buyer/buyer';
import Admin from './Components/admin/Admin';
import SellerNew from './Components/Seller/SellerNew';

export default class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    console.log(window.location.href);
    const { user } = this.state;
    return (
      <React.Fragment>
        <NavBar user={user} />
        <ToastContainer />
        <Switch>
          <Route exact path="/products" Component={Products}>
            <Products />
          </Route>
          <Route path="/not-found" Component={NotFound}>
            <NotFound />
          </Route>
          <Route path="/login" Component={Login}>
            <Login />
          </Route>
          <Route path="/register" Component={Register}>
            <Register />
          </Route>
          {/* <Route path="/single-product/:id" Component={SingleProduct}>
          <SingleProduct />
          </Route> */}

          <Route path="/home" component={Home} />
          <Route path="/logout" component={Logout} />
          <Route path="/contactus" component={ContactUs} />
          <Route path="/howtobid" component={HowTOBid} />
          <Route path="/sell" component={Sell} />
          <Route path="/buy" component={Buy} />
          <Route path="/aboutus" component={AboutUs} />
          <Route path="/single-product/:id" component={SingleProduct} />

          <ProtectedRoute path="/products/:id" component={ProductForm} />
          <ProtectedRoute path="/buyer" component={Buyer} />
          <ProtectedRoute path="/seller" component={SellerNew} />
          <ProtectedRoute path="/admin" component={Admin} />

          <Redirect from="/" exact to="/products" />
          <Redirect to="/not-found" />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}
