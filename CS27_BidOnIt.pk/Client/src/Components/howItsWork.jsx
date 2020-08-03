import React, { Component } from 'react';
import '../Css/howitswork.css';

export default class howItsWork extends Component {
  render() {
    return (
      <div className="row">
        <div className="main-timeline10">
          <div className="col-md-3 col-sm-6 col-12 timeline">
            <div className="timeline-inner">
              <div className="year">Register</div>
              <div className="timeline-content">
                <div className="post">Register</div>
                <p className="description">
                  To avail our facilities, the first step is to get yourself registered to our Website
                  and for that Go to register page , fill in all required details and select Buyer or Seller.
                  After registering yourself you can go to next Step.
                </p>
              </div>
              <div className="timeline-icon">
                <i className="fa fa-globe"></i>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-12 timeline">
            <div className="timeline-inner">
              <div className="year">Buy our Bid</div>
              <div className="timeline-content">
                <div className="post">Buy our Bid</div>
                <p className="description">
                  Next Step is Simple and easy, When you register yourself you are redirected to your dashboard from where you can Purchace Bid pack 
                  which contains some bids. Once you buy Bid Pack you can go to Next step.
                </p>
              </div>
              <div className="timeline-icon">
                <i className="fas fa-shopping-cart"></i>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-12 timeline">
            <div className="timeline-inner">
              <div className="year">Submit a Bid</div>
              <div className="timeline-content">
                <div className="post">Submit a Bid</div>
                <p className="description">
                  After the Purchase of Bids from Our Package, you can go to Products page
                  and then you can place bid on any product. You can moniter live bids on them and 
                  then you can decide to bid more.
                </p>
              </div>
              <div className="timeline-icon">
                <i className="fas fa-gavel"></i>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-12 timeline">
            <div className="timeline-inner">
              <div className="year">Win</div>
              <div className="timeline-content">
                <div className="post">Win</div>
                <p className="description">
                  After the Timer on a product ends, the Highest bidder will get the product and you can win 
                  if you are the Highest bidder in the queue. After winning you can easily go to Dashboard and 
                  can Checkout by paying final amount.
                </p>
              </div>
              <div className="timeline-icon">
                <i className="fas fa-trophy"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
