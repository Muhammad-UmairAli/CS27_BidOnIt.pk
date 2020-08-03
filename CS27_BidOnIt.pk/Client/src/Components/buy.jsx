import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { getprodMaxBid } from '../Services/productService';
// import Product from './common/product';
import '../Css/buy.css';
import { imageUrl } from '../config.json';

export default class Buy extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const { data: products } = await getprodMaxBid();
    this.setState({ products});
  }
  render() {
    const products = this.state.products;
    //console.log(products)
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 firstdiv">
            <b>Benefits</b> for buyers
            <h5 className="heading1">
              You get top quality products at lowest possible prices.
            </h5>
            <p className="paragraphs1">
              Here at BidOnIt we take pride in our customers and want to give them the best experience that they can get. We make sure that every customer gets the best quality product that they can find. 
              We have strick quality ensurance rules that are applied to each and every product that goes up for auction on our website. when buying products of any kind from our website you can be assured that the product on
              which you are bidding will be and is of top quality.
            </p>
            <p className="paragraphs1">
              We also provide easy payment and delivery facilities. you do not have to worry about how u will pay for the product or how you will recieve it. we have a very simple and straightforward 
              payment and delivery method which is made keepingg in mind the ease of our customers. 
            </p>
            <Button className="my-2" variant="warning">
              Read more
            </Button>
          </div>
          <div className="col-sm-6 firstdiv">
            <div className="row rowstyle2">
              <span className="span1">01/</span>
              <span className="span2">
                Laptops,smartphones &<br></br>IT equipments
              </span>
              <p className="paragraphs1">
              You Can find all types of electronic devices like laptops, mobile phones, home appliances beauty appliances and all other electronic items that you have been looking for.
              </p>
            </div>
            <div className="row">
              <span className="span1">02/</span>
              <span className="span2">
                Children's Clothes&<br></br>Shoes Auction
              </span>
              <p className="paragraphs1">
              We also have Clothing items including Men, Women and Children and also Jewelery items on our website. You can find all types of Items here.
              </p>
            </div>
          </div>
        </div>
        <div className="backgroundiv">
          <div className="row">
            <div className="col-12">
              <p className="newpara text-center">
                <b>This Week </b>
                Best Proposals
              </p>
            </div>
            </div>
            <div className="row">
            {products.slice(0, 4).map(product => (
            <div key={product._id} className="col-lg-3 col-md-4 col-sm-6">
              <div className="card card-style">
                <img
                  src={imageUrl+product.imageUrl}
                  className="card-img-top mt-4"
                  alt="ImageNotFound"
                  width="12px"
                  height="180px"
                />

                {product.status === 'Sold' &&
                  <img className="overlay" alt="sold" src="./images/sold.png" />
                }
                 <div className="card-body">
                  <h3 className="card-title text-center">
                    {product.title}
                  </h3>
                  <p className="card-text text-center font-bold font-italic ">
                    <strong>Final Price: Rs.{product.bidAmount}/- </strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>

        <div>
          <div className="row rowstyle2">
            <div className="col-12">
              <img
                className="img-responsive coverimg"
                src="../images/buy1.jpg"
                alt="ImageNotFound"
              ></img>
              <div>
                <p className="buydiscount">
                  Discount Auctions<br></br>
                  <b>50% off</b>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="row rowss">
            <div className="col-sm">
              <h2>FAQ</h2>
              <p className="heading2">How can i bid on an item?
              </p>
              <p className="pricetag">
              The biding process for our auctions is extremely simple. You can have a look on how to bid page on our website where all the instructions are given.
              </p>
              <p className="heading2">How can i buy bids?
              </p>
              <p className="pricetag">
              There are different pacakges available on the website dashboard from which you can choose from. Once you have purchased a package bids will be tranfered to your account.
              </p>
              <p className="heading2">How can i pay for an item?
              </p>
              <p className="pricetag">
                We accept payments through stripe. You can create a stripe account and attach the account to our website for payments. You can pay through stripe for products and to buy bids also.
              </p>
              <p className="heading2">
                How will i get the product?
              </p>
              <p className="pricetag">
                Once you hae won the auction and paid for the item that product will be delivered to your door step through courier services.
                after you hae purchased the product it will take 5 to 7 working days to get the product delivered to you. 
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
