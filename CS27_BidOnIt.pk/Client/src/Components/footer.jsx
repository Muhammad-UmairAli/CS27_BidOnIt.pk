import React from 'react';
import '../Css/footer.css';
import { Link } from 'react-router-dom';
function footer() {
  return (
    <React.Fragment>
      <section id="footer">
        <div className="container ">
          <div className="row text-center text-xs-center text-sm-left text-md-left">
            <div className="col-xs-12 col-sm-6 col-md-4">
              <h5>Quick links</h5>
              <ul className="list-unstyled quick-links">
                <li>
                  
                  <Link className="link-set" to="/home">
                    <a href="/#">
                      <i className="fa fa-angle-double-right"></i>Home
                    </a>
                  </Link>
                  

                </li>
                <li>
                  <Link className="link-set" to="/aboutus">
                  <a href="/#">
                    <i className="fa fa-angle-double-right"></i>About
                  </a>
                  </Link>
                </li>
                <li>
                  <Link className="link-set" to="/buy">
                  <a href="/#">
                    <i className="fa fa-angle-double-right"></i>FAQ
                  </a>
                  </Link>
                </li>
                <li>
                <Link className="link-set" to="/howtobid">
                  <a href="/#">
                    <i className="fa fa-angle-double-right"></i>How to Bid?
                  </a>
                </Link>
                </li>
                <li>
                  <Link className="link-set" to="/contactus">
                  <a href="/#">
                    <i className="fa fa-angle-double-right"></i>Contact Us
                  </a>
                </Link>
                </li>
              </ul>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4">
              <h5>Quick links</h5>
              <ul className="list-unstyled quick-links">
                <li>
                  
                  <Link className="link-set" to="/home">
                    <a href="/#">
                      <i className="fa fa-angle-double-right"></i>Home
                    </a>
                  </Link>
                  

                </li>
                <li>
                  <Link className="link-set" to="/aboutus">
                  <a href="/#">
                    <i className="fa fa-angle-double-right"></i>About
                  </a>
                  </Link>
                </li>
                <li>
                  <Link className="link-set" to="/buy">
                  <a href="/#">
                    <i className="fa fa-angle-double-right"></i>FAQ
                  </a>
                  </Link>
                </li>
                <li>
                <Link className="link-set" to="/howtobid">
                  <a href="/#">
                    <i className="fa fa-angle-double-right"></i>How to Bid?
                  </a>
                </Link>
                </li>
                <li>
                  <Link className="link-set" to="/contactus">
                  <a href="/#">
                    <i className="fa fa-angle-double-right"></i>Contact Us
                  </a>
                </Link>
                </li>
              </ul>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4">
              <ul className="list-unstyled quick-links">
                <li>
                  <img
                    alt="Logo"
                    style={{ marginTop: '4px' }}
                    height="50px"
                    width="290px"
                    className="logo"
                    src="/images/footerLogo.png"
                  />
                </li>
                <hr />
                <li className="display-4 text-white mt-5">
                  Payment
                  <span className="ml-3 mt-5">
                    <i className="fab fa-lg fa-cc-stripe "></i>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 mt-sm-5">
              <ul className="list-unstyled list-inline social text-center">
                <li className="list-inline-item">
                  <a href="/#">
                    <i className="fab fa-facebook-square"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="/#">
                    <i className="fab fa-twitter-square"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="/#">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="/#">
                    <i className="fab fa-google-plus-square"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="/#" target="_blank">
                    <i className="fa fa-envelope"></i>
                  </a>
                </li>
              </ul>
            </div>
            <hr />
          </div>
          <hr />
          <div className="col-xs-12 col-sm-12 col-md-12 mt-sm-2 text-center text-white">
            <p>
              <u>
                <a href="/#">COMSATS UNIVERSITY ISLAMABAD LAHORE CAMPUS </a>
              </u>
              & copy All right Reversed To BidOnIt.pk
            </p>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default footer;
