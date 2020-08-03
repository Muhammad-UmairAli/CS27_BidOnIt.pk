import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Css/navbar.css';
import { imageUrl } from '../config.json';
export default class navbar extends Component {
  render() {
    const { user } = this.props;
    console.log('User ', user);
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Navbar.Brand>
            <img
              alt="Logo"
              style={{ marginTop: '4px' }}
              height="35px"
              width="200px"
              src="/images/Bidonit.png"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            { (
              <React.Fragment>
                <Nav className="ml-auto">
                  <Link className="link-set" to="/home">
                    <i className="fas fa-home" />
                    Home
                  </Link>
                  <Link className="link-set" to="/howtobid">
                    <i className="fas fa-gavel" /> How to Bid?
                  </Link>
                  <Link className="link-set" to="/products">
                    <i className="fas fa-shopping-cart mr-1" />
                    Products
                  </Link>
                  <Link className="link-set" to="/aboutus">
                    <i className="fas fa-users mr-1" />
                    About Us
                  </Link>
                  <Link className="link-set" to="/contactus">
                    <i className="fas fa-envelope-square mr-1" />
                    Contact Us
                  </Link>
                  <Link className="link-set" to="/buy">
                    <i className="fas fa-shopping-basket mr-1"></i>
                    Buy
                  </Link>
                  <Link className="link-set" to="/sell">
                    <i className="fas fa-hand-holding-usd mr-1" />
                    Sell
                  </Link>
                  {!user && (
                    <div style={{marginTop: '10px'}}>
                      <Link className="link-set" to="/login">
                        <i className="fas fa-sign-in-alt mr-1"></i>Login
                      </Link>
                      <Link className="link-set" to="/register">
                        <i className="fas fa-user-plus ml-1"></i> Register
                      </Link>
                    </div>
                  )}
                </Nav>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <Nav className="ml-auto">
                  <Link className="link-set" to={user.type === "admin" ? '/admin/profile' : user.type === "seller" ? '/seller/profile' : '/buyer/profile'}>
                    <b>
                      <img src={imageUrl+user.userImage} alt="Hello" style={{width: '34px', height: '30px', borderRadius: '50%',} } />&nbsp;&nbsp;
                      <span className="badge badge-secondary">
                        <i> {user.name}</i>
                      </span>
                    </b>
                  </Link>
                  <Link className="link-set" to={user.type === "admin" ? '/admin/dashboard' : user.type === "seller" ? '/seller/dashboard' : '/buyer/dashboard'}>
                    Dashboard
                  </Link>
                  {user.type === "buyer" &&
                    <Link className="link-set" to="/buyer/cart">
                      <i className="fa fa-shopping-cart ml-1" aria-hidden="true"></i>
                    </Link>
                  }
                  
                  <Link className="link-set" to="/logout">
                    Logout{' '}
                    <i className="fa fa-sign-out ml-1" aria-hidden="true"></i>
                  </Link>
                </Nav>
              </React.Fragment>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
