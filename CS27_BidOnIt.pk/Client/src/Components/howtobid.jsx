import React, { Component } from 'react';
import '../Css/howtobid.css';

export default class howtobid extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="jumbotron jumbotron-fluid jumbotron-set">
          <div className="container text-center">
            <h1 className="display-4">HOW TO BID?</h1>
            <p className="lead">
              Following are the 4 easy steps to buy any prouct by using Bids.
            </p>
          </div>
        </div>
        <div className="demo">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="main-timeline6">
                  <div className="timeline mt-4">
                    <div className="timeline-content">
                      <span className="step">Step-1</span>
                      <div className="content-inner">
                        <span className="icon">
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                        </span>
                        <h3 className="title">Sign Up and Buy Bids</h3>
                        <p className="description">
                          First, You need to Register Yourself as Buyer in order to Buy bids and Buy product.
                          After Sign up , you will go to user Dashboard and Select Packages detail, from there 
                          you can Select the Bids Pack which you want and Buy by paying through Credit Card.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="timeline">
                    <div className="timeline-content">
                      <span className="step">Step-2</span>
                      <div className="content-inner">
                        <span className="icon">
                          <i className="fas fa-shopping-cart"></i>
                        </span>
                        <h3 className="title">Choose Products</h3>
                        <p className="description">
                          Now you have to go to the Products Section and find out your desired product. There is search and Categories
                          avaialable too, you can use them to save time. Once you find the product you are ready to bid.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="timeline">
                    <div className="timeline-content">
                      <span className="step">Step-3</span>
                      <div className="content-inner">
                        <span className="icon">
                          <i className="fas fa-coins"></i>
                        </span>
                        <h3 className="title">Place Bids</h3>
                        <p className="description">
                          After you have found our desired product, you need to Check the time left and highest bid so far 
                          on that product. Now is the time , you can Place bid. One bid increases 1 minute of time and 10Rs of 
                          the products bid amount and then after placing bid you can see live bid on it in your dashboard as well.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="timeline my-4">
                    <div className="timeline-content">
                      <span className="step">Step-4</span>
                      <div className="content-inner">
                        <span className="icon">
                          <i className="fas fa-gift"></i>
                        </span>
                        <h3 className="title">Win your Product</h3>
                        <p className="description">
                          You can only win your product if you are the Highest bidder when the timer ends.
                          If you win, the product is removed from products and goes to your dahsboard in Orders section from
                          where you checkout by paying rest amount and it is deliverd to you in 7 days.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
