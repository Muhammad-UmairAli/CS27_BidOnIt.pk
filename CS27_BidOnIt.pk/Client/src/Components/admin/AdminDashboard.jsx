import React, { Component } from 'react';
import '../../Css/AdminDashboard.css'
import { Link } from 'react-router-dom';
import { getAllDataCount } from '../../Services/commonService'
export default class AdminDashboard extends Component {
  state = {
    sellerCount : 0,
    buyersCount : 0,
    liveAuctionsCount : 0,
    pendingAuctionsCount : 0,
    finishedAuctionsCount : 0,
    soldTransCount : 0,
    ongoingTransCount : 0,
    bidTransCount : 0,
    messageCount : 0
};

async componentDidMount() {
    const { data } = await getAllDataCount();
    this.setState({ 
      sellerCount : data[0].sellerCount,
      buyersCount : data[0].buyerCount,
      liveAuctionsCount : data[0].liveAutionsCount,
      pendingAuctionsCount : data[0].pendingAuctionsCount,
      finishedAuctionsCount : data[0].finishedAuctionsCount,
      soldTransCount : data[0].soldTransCount,
      ongoingTransCount : data[0].ongoingTransCount,
      bidTransCount : data[0].bidTransCount,
      messageCount : data[0].messagesCount
    }); 
}
  render() 
  {
    return (
        <div>
          <div className="row border-bottom my-3">
            <div className="col">
              <h2>Admin Dashboard</h2>
            </div>
          </div>

          <div className="row ">
            <div className="col">
              <h2>Auctions</h2>
            </div>
          </div>
          
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8 col-xs-12">
              <div className="LiveAuctions my-2">
                <div className="card-body colorcards1">
                  <h4
                  className="card-title"
                  >
                    Live auctions
                  </h4>
                  <Link className='text-dark' to={"/admin/filter-view-products/live"}>
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

              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8 col-xs-12">
                <div className="LiveAuctions my-2">
                  <div className="card-body colorcards2">
                    <h5
                    className="card-title"
                    >
                      Pending Auctions
                    </h5>
                    <Link className='text-dark' to={"/admin/filter-view-products/pending"} >
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
                <div className="LiveAuctions my-2">
                  <div className="card-body colorcards3">
                    <h5
                    className="card-title"
                    >
                      Finished Auctions
                    </h5>
                    <Link className='text-dark' to={"/admin/filter-view-products/finished"} >
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
              </div>

          </div>

          <div className="row">
          <div className="col">
            <h2>Transactions</h2>
          </div>
        </div>

          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8 col-xs-12">
              <div className="LiveAuctions my-2">
                <div className="card-body colorcards1">
                  <h4
                  className="card-title"
                  >
                    Sold Transactions
                  </h4>
                  <Link className='text-dark' to={"/admin/orders"} >
                      <button
                      type="button"
                      className="btn btn-sm btn-outline-warning"
                      >
                        View All >
                      </button>
                    </Link>
                  <p className="card-text">
                  {this.state.soldTransCount} Sold Transactions
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8 col-xs-12">
              <div className="LiveAuctions my-2">
                <div className="card-body colorcards2">
                  <h5
                  className="card-title"
                  >
                    Ongoing Transactions
                  </h5>
                  <Link className='text-dark' to={"/admin/filter-view-biddings/ongoing"} >
                      <button
                      type="button"
                      className="btn btn-sm btn-outline-warning"
                      >
                        View All >
                      </button>
                    </Link>
                  <p className="card-text">
                  {this.state.ongoingTransCount} Ongoing Transactions
                  </p>
                </div>
                </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8 col-xs-12">
              <div className="LiveAuctions my-2 ml-auto">
                <div className="card-body colorcards3">
                  <h5
                  className="card-title"
                  >
                    Bid Transactions
                  </h5>
                  <Link className='text-dark' to={"/admin/user-packs"} >
                      <button
                      type="button"
                      className="btn btn-sm btn-outline-warning"
                      >
                        View All >
                      </button>
                    </Link>
                  <p className="card-text">
                  {this.state.bidTransCount} Package Transactions
                  </p>
                </div>
              </div>
            </div>
        </div>

          <div className="row">
            <div className="col">
              <h2>Users</h2>
              </div>
          </div>

          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8 col-xs-12">
              <div className="LiveAuctions my-2">
                <div className="card-body colorcards1">
                  <h4
                  className="card-title"
                  >
                    Registered Users
                  </h4>
                  <Link className='text-dark' to={"/admin/view-users"} >
                    <button
                    type="button"
                    className="btn btn-sm btn-outline-warning"
                    >
                      View All >
                    </button>
                  </Link>
                  <p className="card-text">
                  {this.state.buyersCount} Registered Users
                    </p>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8 col-xs-12">
              <div className="LiveAuctions my-2">
                <div className="card-body colorcards2">
                  <h5
                  className="card-title"
                  >
                    Registered Sellers
                  </h5>
                  <Link className='text-dark' to={"/admin/view-sellers"} >
                    <button
                    type="button"
                    className="btn btn-sm btn-outline-warning"
                    >
                      View All >
                      </button>
                  </Link>
                  <p className="card-text">
                  {this.state.sellerCount} Registered Sellers
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8 col-xs-12">
              <div className="LiveAuctions my-2">
                <div className="card-body colorcards3">
                  <h5
                  className="card-title">
                    User Messages
                  </h5>
                  <Link className='text-dark' to={"/admin/user-messages"} >
                    <button
                    type="button"
                    className="btn btn-sm btn-outline-warning"
                    >
                      View All >
                      </button>
                  </Link>
                  <p className="card-text">
                    {this.state.messageCount} Messages
                  </p>
                </div>
              </div>
            </div>
        </div>

        {/* <div className="row">
          <div className="col">
            <h2>Transactions</h2>
          </div>
        </div> */}

          {/* <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8 col-xs-12">
              <div className="LiveAuctions my-2">
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
              <div className="LiveAuctions my-2">
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
              <div className="LiveAuctions my-2 ml-auto">
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
