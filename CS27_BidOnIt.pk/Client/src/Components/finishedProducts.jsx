import React, { Component } from 'react';
import '../Css/finishedAuction.css';
import { imageUrl } from '../config.json';
export default class finishedProducts extends Component {
  render() {
    const { products } = this.props;
    return (
      <div>
        <div className="row">
          {products.slice(0, 4).map(product => (
            <div key={product._id} className="col-lg-3 col-md-4 col-sm-6">
              <div className="card card-style my-2 mx-2">
                <img
                  src={imageUrl+product.imageUrl}
                  className="card-img-top mt-4"
                  alt="ImageNotFound"
                  width="12px"
                  height="180px"
                />
                <img className="overlay" alt="sold" src="./images/sold.png" />
                <div className="card-body">
                  <h2 className="card-title text-center ">
                    {product.title}
                  </h2>
                  <p className="card-text text-center font-bold font-italic ">
                    Final Price: Rs.{product.bidAmount}/-
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
