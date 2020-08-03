import React, { Component } from 'react';
import '../../Css/AdminDashboard.css'
import { Link } from 'react-router-dom';
import { getAllDataCountBuyer } from '../../Services/commonService'

export default class BuyerDashboard extends Component {
  state = {
    liveAuctionsCount : 0,
};
  async componentDidMount() {
    const { data } = await getAllDataCountBuyer();
    this.setState({
      liveAuctionsCount : data[0].liveAutionsCount,
    }); 
}
  render() 
  {
    return (
        <div>
          <div className="row border-bottom my-3">
            <div className="col">
              <h2>Buyer's Dashboard</h2>
            </div>
          </div>

           <div className="row ">
            <div className="col">
              <h2>Auctions</h2>
            </div>
          </div>
          
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8 col-xs-12">
              <div className="card LiveAuctions my-2">
                <div className="card-body colorcards1">
                  <h4
                  className="card-title"
                  >
                    Live auctions
                  </h4>
                  <Link className='text-dark' to={"/buyer/my-biddings-products"}>
                    <button
                    type="button"
                    className="btn btn-sm btn-outline-warning"
                    >
                      View All >
                    </button>
                  </Link>
                  <p className="card-text">
                    {this.state.liveAuctionsCount} Live Auctions
                  </p>
                </div>
                </div>
              </div>

              {/*<div className="col-xl-4 col-lg-4 col-md-6 col-sm-8 col-xs-12">
                <div className="card LiveAuctions my-2">
                  <div className="card-body colorcards2">
                    <h5
                    className="card-title"
                    >
                      Pending Auctions
                    </h5>
                    <Link className='text-dark' to={"/seller/view-products"} >
                      <button
                      type="button"
                      className="btn btn-sm btn-outline-warning"
                      >
                        View All >
                      </button>
                    </Link>
                    <p className="card-text">
                    {this.state.pendingAuctionsCount} Pending Auctions
                    </p>
                  </div>
                </div>
              </div>
            
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8 col-xs-12">
                <div className="card LiveAuctions my-2">
                  <div className="card-body colorcards3">
                    <h5
                    className="card-title"
                    >
                      Finished Auctions
                    </h5>
                    <Link className='text-dark' to={"/seller/view-products"} >
                      <button
                      type="button"
                      className="btn btn-sm btn-outline-warning"
                      >
                        View All >
                      </button>
                    </Link>
                    <p className="card-text">
                    {this.state.finishedAuctionsCount} Finished currentAuctions
                    </p>
                  </div>
                </div>
                </div>*/}

          </div>

        {/*<div className="row">
          <div className="col">
            <h2>Transactions</h2>
          </div>
        </div>

          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8 col-xs-12">
              <div className="card LiveAuctions my-2">
                <div className="card-body colorcards1">
                  <h4
                  className="card-title"
                  >
                    Sold transactions
                  </h4>
                  <button
                  type="button"
                  className="btn btn-sm btn-outline-warning"
                  >
                    View All >
                  </button>
                  <p className="card-text">
                    7 Live Auctions
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8 col-xs-12">
              <div className="card LiveAuctions my-2">
                <div className="card-body colorcards2">
                  <h5
                  className="card-title"
                  >
                    Ongoing Transactions
                  </h5>
                  <button
                  type="button"
                  className="btn btn-sm btn-outline-warning"
                  >
                    View All >
                  </button>
                  <p className="card-text">
                    10 Pending Auctions
                  </p>
                </div>
                </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8 col-xs-12">
              <div className="card LiveAuctions my-2 ml-auto">
                <div className="card-body colorcards3">
                  <h5
                  className="card-title"
                  >
                    Bid Transactions
                  </h5>
                  <button
                  type="button"
                  className="btn btn-sm btn-outline-warning"
                  >
                    View All >
                  </button>
                  <p className="card-text">
                    20 Finished Auctions
                  </p>
                </div>
              </div>
            </div>
        </div> */}
      </div>
    )
}
}
