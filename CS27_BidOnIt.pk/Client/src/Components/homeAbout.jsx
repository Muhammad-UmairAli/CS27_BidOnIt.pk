import React, { Component } from 'react';

export default class homeAbout extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xm-12">
          <span className="span1">01/</span>
          <span className="span2">
            Laptops,smartphones &<br></br>IT equipments
          </span>
          <p className="paragraphs1">
          You Can find all types of electronic devices like laptops, mobile phones, home appliances beauty appliances and all other electronic items that you have been looking for.
          </p>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xm-12">
          <span className="span1">02/</span>
          <span className="span2">
            Children's Clothes&<br></br>Shoes Auction
          </span>
          <p className="paragraphs1">
          We also have Clothing items including Men, Women and Children and also Jewelery items on our website. You can find all types of Items here.
          </p>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xm-12">
          <i className="fa fa-globe fa-5x" aria-hidden="true" style={{color:"#FFD613"}}/>
          <h4>
            We are Providing Services
            <br />
            to WorldWide
          </h4>
          <p className="paragraphs1">
          You can sell and buy items from our website from all over the world.
            <br />
          We have our worldwide shipping facility.
          </p>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xm-12">
          <i className="fas fa-thumbs-up fa-5x " style={{color:"#FFD613"}}/>
          <h4>
            More than 20 Years
            <br />
            of experience
          </h4>
          <p className="paragraphs1">
            We have been working in the online auction business for more than 20 years
            <br />
            All of our products are reliable and of Top quality.
          </p>
        </div>
      </div>
    );
  }
}
