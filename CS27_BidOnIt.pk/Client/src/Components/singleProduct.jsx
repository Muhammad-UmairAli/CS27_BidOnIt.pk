import React, { Component } from 'react';
import { getProductAndSeller } from '../Services/productService';
import { rateSellerByBuyer } from '../Services/userService';
import { imageUrl } from '../config.json';
import StarRatingComponent from 'react-star-rating-component';
import { getCurrentUser } from '../Services/authService';
import { saveProductBid } from '../Services/productService';
import { getUser } from '../Services/userService';
import { toast } from 'react-toastify';
import CountDown from './common/Countdown';
import { Redirect} from 'react-router-dom';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import '../Css/products.css';
// import $ from 'jquery';
const apiEndpoint = imageUrl;

export default class SingleProducts extends Component {
  state = {
    productId : this.props.match.params.id,
    product: {},
    seller: {},
    images : [],
    Category : {},
    rating : 0,
    running : true,
    newData : true,
    redirect : false,
    disableBidBtn : false,
    showView : false,
    slderimages : [],
    showDesc : true
  };

  async componentDidMount() {
    // $('.collapse').collapse();
    const productId = this.state.productId;
    const  {data} = await getProductAndSeller(productId);
    let seller  = data.user;
    seller.avg_string = Math.round(data.avg).toFixed(1);
    seller.avg = Math.round(data.avg);
    this.setState({ 
      product: data.product, 
      Category : data.product.catagory, 
      images : data.product.otherImages, 
      seller : seller, running : 
      this.state.running === true ? false : true, 
      newData : this.state.newData === true ? false : true, 
      showView : true 
    }, function(){
      console.log(this.state);
    });
    
    let imgArray = [];
    for(let i =0; i < this.state.images.length; i++){
      let imgObj = { original: '',thumbnail: ''};
      imgObj.original = apiEndpoint+this.state.images[i];
      imgObj.thumbnail = apiEndpoint+this.state.images[i];
      imgArray.push(imgObj);
      console.log(imgObj);
      console.log('Image Array in loop',imgArray);
    }
    this.setState({
      slderimages : imgArray
    });
    console.log('Image Array',imgArray);
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log(this.state.product)
    if(this.state.product !== prevState.product){
      this.setState({
        product : this.state.product, 
        showView : true,
        // running : this.state.running === true ? false : true, 
        // newData : this.state.newData === true ? false : true 
      });
    }
  }
  showHideDesc(){
    this.setState({
      showDesc : this.state.showDesc === true ? false : true 
    })
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
    let prods = this.state.product;
    let form = product;
    var bidAmount = form.bidAmount + 10;
    prods['timer'] = (+form['timer'] + 1);
    form['bidAmount'] = bidAmount;
    form['timer'] = prods['timer'];
    form.catagoryId = form.catagory._id;
    form.bidByName = getCurrentUser().name;
    form.userId = getCurrentUser()._id;
    form.productId = form._id;
    const {data} = await saveProductBid(form);
    prods['bidByName'] = (data.product.bidByName);
    prods['status'] = (data.product.status);
    prods['bidAmount'] = (data.product.bidAmount);
    prods['bidBy'] = (data.product.bidBy);
    prods['endTime'] = (data.eTime);
    prods['timestamp'] = (data.product.timestamp);
    this.setState({
      product : prods,
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
    let prods = this.state.product;
    //console.log(value);
    //let indexp = prods.filter(prod => prod._id.indexOf(productId) !== -1)[0];
    //let index = 0;
    if(prods !== undefined)
    {
      //console.log(prods);
      prods['timer'] = (+value / 60000);
      prods['endTime'] = value;
      this.setState({
        product : prods
      }, function(){
        //console.log(this.state.product);
      });
    }
    
  }

  async onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
    let ratingobj = {
      sellerId : this.state.seller._id,
      rating : nextValue
    };
    console.log(ratingobj);
    let {data} = await rateSellerByBuyer(ratingobj);
    let avg = data.rating / data.rateCount;
    data.avg = Math.round(avg).toFixed(1);
    console.log(data);
  }
  render() {
    const { rating } = this.state;
    let that = this;
    let product = that.state.product;
    if(that.state.redirect === true){
      return <Redirect to="/register" />
    }
    return (
      
      <React.Fragment>

        {that.state.showView === true && 
        <div className="container">  
          <nav aria-label="breadcrumb" className="mt-2">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">{this.state.Category.name}</li>
              <li class="breadcrumb-item active" aria-current="page">{product.title}</li>
            </ol>
          </nav>
          <div className="row mb-4 border-bottom pb-3">
            <div className="col-12 col-sm-6 mt-5">
            <ImageGallery items={this.state.slderimages} />
            </div>
            <div className="col-12 col-sm-6 mt-5">
              <h2>{product.title}</h2>
              <p>Category : {this.state.Category.name}</p>
              <p>Price : Rs&nbsp;{product.price}</p>
              
              <p>
                {product.bidBy !== undefined && product.bidBy !== null ? 'Bid' : 'Bid Starts From'} : Rs.{ product.bidAmount }/- { product.bidByName !== undefined && product.bidByName !== null ? ' by : '+product.bidByName : ''}
              </p>
              <div className="mainTimerDiv">
                <span className="timer">
                  <span>
                    <CountDown timer={product.endTime} newData={this.state.newData} timestamp={product.timestamp} running={this.state.running} productIndex={product._id} currentCountDown={that.saveCurrentTime} />
                  </span>
                </span>
                {product.endTime > 0 && (!getCurrentUser() || getCurrentUser().type === 'buyer') &&
                <button
                  type="button"
                  className="btn btn-sm btn-outline-warning"
                  onClick={() => that.submitBid(product, 0)}
                  disabled={this.state.disableBidBtn}
                >
                  Submit a Bid
                </button>
              }
              </div>
              
              {product.endTime <= 0 && product.status === 'Sold' && 
                <img className="overlay" alt="sold" src="./images/sold.png" />
              }
              {product.endTime <= 0 && product.status === 'Un-Sold' && 
                <h2>{product.status}</h2>
              }
            </div>  
          </div>
          <div className="row mb-3">
            <div className="col-12 col-sm-6 mb-3  ">
              <div class="accordion" id="accordionExample">
                <div class="card">
                  <div class="card-header" id="headingOne" onClick={() => this.showHideDesc()}>
                    <h2 class="mb-0">Product Description :</h2>
                  </div>
                  {this.state.showDesc && 
                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div class="card-body">
                        <p>{product.description}</p>
                      </div>
                    </div>
                  }
                </div>
              </div>
              
            </div>
            <div className="col-12 col-sm-6">
              <div className="sellerCard">
                <h2>Seller Detail : </h2>
                <h5>Name : {this.state.seller.name}</h5>
                <p>Email : {this.state.seller.email}</p>
                <p className="rating">Rating : 
                  <StarRatingComponent 
                    name="rate1" 
                    starCount={5}
                    editing={false}
                    value={this.state.seller.avg}
                    onStarClick={this.onStarClick.bind(this)}
                  /> ({this.state.seller.rateCount})
                </p>
              
                {getCurrentUser() && getCurrentUser().type === 'buyer' && 
                <StarRatingComponent 
                  name="rate1" 
                  starCount={5}
                  value={rating}
                  onStarClick={this.onStarClick.bind(this)}
                />
                }     
              </div> 
            </div>
          </div>  
        </div>
      }
      </React.Fragment>
    );
  }
}
