import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import '../Css/aboutus.css';

export default class aboutus extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm style1">
              <b>Who</b> We Are
              <img className="img1" alt=".." src="../images/about1.jpg" />
              <p className="headings1">
                We are an online auction Website.
              </p>
              <p className="paragraphs1">
                Here at BidOnIt.pk we believe in giving our customers a unqiue and wonderfull experience. We believe in 
                a more valuable and less invasive way where customers are earned rather than bought. Our mission is to bring 
                customers best quality products in best price that they can find.
              </p>
              <p className="paragraphs1">
              We want to give people a new 
              and unique experience of bidding which is completely opposite to the traditional way of bidding.
              </p>
              <Button variant="warning">Read more</Button>
            </div>

            <div className="col-sm style1">
              <b>Why</b> Choose Us
              <p className="heading2">
                <span className="span1">01</span>We ensure you have the best experience.
              </p>
              <p className="paragraphs1">
                At BidOnIt we take customer experience very seriously. We continue to work on giving all our customers
                their best experience and resole all the issues to the best of our abilities.
              </p>
              <p className="heading2">
                <span className="span1">02</span>We ensure that we provide only good quality and authentic products.
              </p>
              <p className="paragraphs1">
                We are dedicated toward providing our customers with only good quality and authentic products. 
                We have a complete team dedicated to quality assurance, that makes sure each and every product displayed 
                on our website fulfills our quality guidelines.
              </p>
              <p className="heading2">
                <span className="span1">03</span>We have made buying products easier.
              </p>
              <p className="paragraphs1">
                Our unique and different auction system seperates us from all the other online stores. 
                We have made buying products of your choice way easier and you also get a reasonable price.
              </p>
            </div>

            <div className="col-sm style1">
              <b>Our</b> Mission
              <p className="headings1">
                Give our customers a unique experience.
              </p>
              <p className="paragraphs1">
                We, founders of BidOnIt are always looking for unique and innovative ways to make our and others life easier.
                We have been very fasinated by the way auctions and bidding systems have been working for many years and people find time
                in their daily lives to go and attend the auctions and to buy products.We thought instead of making people wait for the auctions
                and for them to go to the auctios personally why not bring the auctions to them so that it will become easier for the people to buy the
                products they like at their own convinence instead of waiting for a particular day and time. We created this website just for that purpose. 
                We are dedicated to serve our customers with the best quality products in a unique manner.
              </p>
              <ul className="paragraphs1">
                <li className="margins">A unique user experience</li>
                <li className="margins">Best quality Products</li>
                <li className="margins">An easy platform where you can find products you like</li>
                <li className="margins">An easy platform where you buy products without bargaining</li>
                <li className="margins">An easier and convinent way to buy products at your ease</li>
                <li className="margins">No bragain, no high price </li>
                <li className="margins">More bid makes chanes to win more</li>
              </ul>
            </div>
          </div>

          <div className="row pb-4">
            <p className="display-4">Our Team</p>
            <div className="row mr-auto ml-auto ">
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="card card-style my-2">
                  <img
                    src="../images/team.png"
                    className="card-img-top"
                    alt="..."
                    width="10px"
                    height="230px"
                  />
                  <div className="card-body">
                    <h5
                      style={{ fontSize: '15px' }}
                      className="card-title text-center"
                    >
                      Muhammad Umair Ali
                    </h5>
                    <p className="card-text">
                      Computer Science 8th semester student from COMSATS Lahore.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="card card-style my-2">
                  <img
                    src="../images/team.png"
                    className="card-img-top"
                    alt="..."
                    width="10px"
                    height="230px"
                  />
                  <div className="card-body">
                    <h5
                      style={{ fontSize: '15px' }}
                      className="card-title text-center"
                    >
                      Muhammad Afnan Abbas  
                    </h5>
                    <p className="card-text">
                       Computer Science 8th semester student from COMSATS Lahore.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="card card-style my-2">
                  <img
                    src="../images/team.png"
                    className="card-img-top"
                    alt="..."
                    width="10px"
                    height="230px"
                  />
                  <div className="card-body">
                    <h5
                      style={{ fontSize: '15px' }}
                      className="card-title text-center"
                    >
                      Maheen Saleemi
                    </h5>
                    <p className="card-text">
                    Computer Science 8th semester student from COMSATS Lahore.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="card card-style my-2">
                  <img
                    src="../images/team.png"
                    className="card-img-top"
                    alt="..."
                    width="10px"
                    height="230px"
                  />
                  <div className="card-body">
                    <h5
                      style={{ fontSize: '15px' }}
                      className="card-title text-center"
                    >
                      Brye Walker
                    </h5>
                    <p className="card-text">
                      Hac habitasse platea dictumst quisque sagittis. Cursus
                      mattis molestie a iaculis at
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row row1">
            <div className="col-sm style1">
              <b>Our</b>Advantages
              <p className="paragraphs2">
                If you decide to get your desired products from us we guarantee you will get best quality products 
                in the best price that you can find on any other online store. In addition to that you save yourself from 
                all the hustle of going to markets and auctions to get products. you get the same products from the comfort of you home.
              </p>
            </div>

            <div className="col-sm style1">
              <b>Skills</b>
              <p className="paragraphs2">
                Our website is SEO optimized we gayrentee you that your products will be sold with the most appropriate pricing. We have strick quality ensurance rules every product 
                that is placed on our website is checked thoroughly and we make sure that the quality of the product is not compromised in any way. when buying products from our 
                website you do not need to worry about products quality at all. 
              </p>
              <ul className="paragraphs1">
                <li>Gadgets</li>
                <li>Accessories</li>
                <li>Gadgets</li>
                <li>Accessories</li>
              </ul>
            </div>

            <div className="col-sm style1">
              <b>Testimonials</b>
              <br></br>
              <img className="img2" alt=".." src="../images/p5.jpg" />
              <p className="paragraphs1">
                  "I got a microwave from this website it was the best quality and in the most reasonable price I recommend everyone 
                  to buy products from here. They gives us best price,best discount and we make our own price with just a click" - Sarah Barke
              </p>
              <p className="paragraphs1">
                "This is the best auction website I know of always get my products from here" - Bryce Walker
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
