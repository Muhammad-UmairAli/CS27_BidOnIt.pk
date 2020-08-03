import React, { Component } from 'react';
import Carousel from './common/carousel';
import { getLiveProducts, getFinishdProducts } from '../Services/productService';
import FinishedProducts from './finishedProducts';
import CurrentProducts from './currentAuctions';
import HowItsWork from './howItsWork';
import HomeAbout from './homeAbout';

export default class home extends Component {
  state = {
    products: [],
    liveproducts : [],
    finishdproducts : []
  };

  async componentDidMount() {
    const { data: liveproducts } = await getLiveProducts();
    const { data: finishdproducts } = await getFinishdProducts();
    this.setState({ liveproducts, finishdproducts });
  }

  render() {
    return (
      <div>
        <Carousel />
        <div
          style={{ backgroundColor: '#F5F5F5' }}
          className="container-fluid "
        >
          <span className="display-4 font-italic">
            <b>Current</b> Auctions
          </span>
          <CurrentProducts products={this.state.liveproducts} />
          <hr />
          <span className="display-4 font-italic">
            <b>Finished</b> Auctions
          </span>
          <FinishedProducts products={this.state.finishdproducts} />
          <hr />
          <span className="display-4 font-italic">How Its Work?</span>
          <HowItsWork />
          <hr />
          <HomeAbout />
        </div>
      </div>
    );
  }
}
