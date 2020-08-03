import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../Css/sidebar.css';

export default class sidebar extends Component {
  render() {
    return (
      <div class="sidenav">
        <Link to="/seller/dashboard">
          <i className="fas fa-home" />
          Dashboard
        </Link>
        <Link to="/seller/profile">
          <i className="fas fa-gavel" /> Profile
        </Link>
        <Link to="/products/new">
          <i className="fas fa-shopping-cart mr-1" />
          Add Products
        </Link>
        <Link to="/seller/view-products">
          <i className="fas fa-users mr-1" />
          View Products
        </Link>
        <Link to="/seller/payment">
          <i className="fas fa-envelope-square mr-1" />
          Payment
        </Link>
      </div>
    );
  }
}
