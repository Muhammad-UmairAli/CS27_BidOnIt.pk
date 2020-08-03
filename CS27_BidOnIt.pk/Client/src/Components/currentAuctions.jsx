import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Css/card.css';
import { getCurrentUser } from '../Services/authService'
import { saveProductBid } from '../Services/productService';
import { getUser } from '../Services/userService';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { imageUrl } from '../config.json';
import CountDown from './common/Countdown';

export default class currentAuctions extends Component 
{
  constructor(props) {
    super(props);
    this.state = {
      input : [],
      msgs : [],
      products : this.props.products,
      running : true,
      newData : true,
      redirect : false,
      disableBidBtn : false,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.state.products !== this.props.products){
      this.setState({
        products : this.props.products, 
        running : this.state.running === true ? false : true, 
        newData : this.state.newData === true ? false : true 
      });
    }
  }

  showBidForm = (product, index) => {
    if (!getCurrentUser()) {
      this.setState({
        redirect : true
      })
    };
    let prods = this.state.products;
    prods[index]['show_input'] = prods[index]['show_input'] === true ? false : true;
    this.setState({
      products : prods
    })
  }

  handleChangeTypeValue(event, product, index) {
    var input = [];
    input[event.target.name] = event.target.value;
    let prods = this.state.products;
    prods[index][event.target.name] = +event.target.value;
    this.setState({
      input: input,
      products : prods
    }, function(){
    });
  }

  saveBidForm = async (product, index) => {
    let prods = this.state.products;
    let form = product;
    if(form.msgs.showMsg === true){
      return false;
    }
    var msg = '';
    var showMsg = false;
    var amount = form.bidAmount !== undefined ? form.bidAmount : form.price;
    
    if(amount < this.state.input['bidAmount_'+product._id]){
      form.bidAmount = this.state.input['bidAmount_'+product._id];

      prods[index]['timer'] = (+form['timer'] + 0.16);
      form['timer'] = prods[index]['timer'];

      form.catagoryId = form.catagory._id;
      form.bidByName = getCurrentUser().name;
      form.userId = getCurrentUser()._id;
      form.productId = form._id;
      ////console.log(form);
      const {data} = await saveProductBid(form);
      ////console.log(data);
      prods[index]['bidByName'] = (data.bidByName);
      prods[index]['status'] = (data.status);
      prods[index]['bidAmount'] = (data.bidAmount);
      this.setState({
        products : prods,
        running : this.state.running === true ? false : true
      });
      this.showBidForm(product, index);
    }else{
      msg = "Amount should be greater then price!";
      showMsg = true;
      prods[index]['msgs'] = {showMsg : showMsg, msg : msg};
      this.setState({
        products : prods
      })
    }
  }

  submitBid = async (product, index) => {
    if (!getCurrentUser()) {
      this.setState({
        redirect : true
      })
      return false;
    };
    let userData = await getUser();
    if(userData.data.packages === undefined || userData.data.packages.length <= 0){
      toast.error('No Bids found. Please purchase a Package of Bids.');
      return false;
    }else{
      if(userData.data.packages[0].bids === 0){
        toast.error('No remaining Bids found. Your Package is expired. Please purchase a new Package of Bids.');
        return false;
      }
    }
    this.setState({disableBidBtn : true});
    let prods = this.state.products;
    let form = product;
    var bidAmount = form.bidAmount + 10;
    prods[index]['timer'] = (+form['timer'] + 1);
    form['bidAmount'] = bidAmount;
    form['timer'] = prods[index]['timer'];
    form.catagoryId = form.catagory._id;
    form.bidByName = getCurrentUser().name;
    form.userId = getCurrentUser()._id;
    form.productId = form._id;
    const {data} = await saveProductBid(form);
    prods[index]['bidByName'] = (data.product.bidByName);
    prods[index]['status'] = (data.product.status);
    prods[index]['bidAmount'] = (data.product.bidAmount);
    prods[index]['bidBy'] = (data.product.bidBy);
    prods[index]['endTime'] = (data.eTime);
    prods[index]['timestamp'] = (data.product.timestamp);
    this.setState({
      products : prods,
      running : this.state.running === true ? false : true,
      newData : this.state.newData === true ? false : true 
    }, function(){
      setTimeout(() => {
        this.setState({
          disableBidBtn : false,
        });
        toast.success('Bid Placed successfully.');
      }, 1500);
    });
    
  }

  saveCurrentTime = (productId, value) =>{
    let prods = this.state.products;
    let indexp = prods.filter(prod => prod._id.indexOf(productId) !== -1)[0];
    let index = prods.indexOf(indexp);
    if(prods[index] !== undefined)
    {
      prods[index]['timer'] = (+value / 60000);
      prods[index]['endTime'] = value;
      this.setState({
        products : prods
      }, function(){
      });
    }
    
  }

  numberValid(event, index)
   {
      let inputtxt = event.target.value;
      var numbers = /^[0-9]+$/;
      var msg = '';
      var showMsg = false;
      if(inputtxt !== "" && !(inputtxt.match(numbers))){
        msg = "Invalid Amount!";
        showMsg = true;
      }
      var prods = this.state.products;
      prods[index]['msgs'] = {showMsg : showMsg, msg : msg};
      this.setState({
        products : prods
      })
   }

  render() {
    const that = this;
    if(that.state.redirect === true){
      return <Redirect to="/register" />
    }
    // const { products } = this.props;
    return (
      <React.Fragment>
        <div className="row ml-2">
          {that.state.products.slice(0, 4).map((product ,index) => ( product.endTime > 0 &&
            <div key={product._id} className="col-lg-3 col-md-4 col-sm-6">
              <div className="card card-style my-2">
                <img
                  src={imageUrl+product.imageUrl}
                  className="card-img-top"
                  alt="..."
                  width="12px"
                  height="180px"
                />

                <span className="timer">
                <span>
                <CountDown timer={product.endTime} newData={that.state.newData} timestamp={product.timestamp} running={that.state.running} productIndex={product._id} currentCountDown={that.saveCurrentTime} />
                  
                </span>
              </span>
                
              <div className="card-body custom_cardBody">
              <Link to={`../single-product/${product._id}`}>
                <h5
                  style={{ fontSize: '15px' }}
                  className="card-title text-center"
                >
                  {product.title}
                </h5>
                </Link>
                  <p className="card-text text-center">Price Rs.{ product.price}/-</p>
                <p className="card-text text-center">{product.bidBy !== undefined && product.bidBy !== null ? 'Bid' : 'Bid Starts From'} : Rs.{ product.bidAmount }/- { product.bidByName !== undefined && product.bidByName !== null ? ' by : '+product.bidByName : ''}</p>
                {product.endTime > 0 && (!getCurrentUser() || getCurrentUser().type === 'buyer') &&
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-warning"
                    onClick={() => that.submitBid(product, index)}
                    disabled={this.state.disableBidBtn}
                  >
                    Submit a Bid
                  </button>
                }
                {product.endTime <= 0 && product.status === 'Sold' && 
                  <img className="overlay" alt="sold" src="./images/sold.png" />
                }
                {product.endTime <= 0 && product.status === 'Un-Sold' && 
                  <h2>{product.status}</h2>
                }
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center my-2">
          <Link to="/products" className="btn btn-outline-warning">
            Show More
          </Link>
        </div>
      </React.Fragment>
    );
  }
}
