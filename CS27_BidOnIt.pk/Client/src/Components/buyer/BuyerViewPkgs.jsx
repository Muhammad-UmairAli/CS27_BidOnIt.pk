import React, { Component, useState } from 'react';
import { toast } from 'react-toastify';
import { getPkgs, pkgPurchaseByUser,} from '../../Services/pakgService';
import { deletePaymentMethodById } from '../../Services/commonService';
import { getUser } from '../../Services/userService';
import {Button} from 'react-bootstrap';
import auth from '../../Services/authService';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_test_MHBFWlMMa9GkXOmia8MjlE7F00dVyaNuIn');
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};

const CheckoutForm = (Pkg) => {
  
  let {selectedPkg} = Pkg;
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  // Handle real-time validation errors from the card Element.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  }

  // Handle form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    toast.warn('Working on your request!');
    const user = await auth.getCurrentUser();
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card)
    if (result.error) {
      // Inform the user if there was an error.
      setError(result.error.message);
    } else {
      setError(null);
      const { paymentMethod, paymentMethodError } = await stripe.createPaymentMethod({
        type: 'card',
        card: card,
      });
      if(paymentMethodError){
        setError(paymentMethodError);
      }else{
        let pkgInfo = {
          user_id: user._id,
          token : result.token.id,
          card: result.token.card.id,
          pkgId: selectedPkg._id,
          bids: selectedPkg.bids,
          price : selectedPkg.price,
          payment_method:paymentMethod,
          type : 'new'
        }
        //console.log(pkgInfo);
        let pkgres = await pkgPurchaseByUser(pkgInfo);
        //console.log(pkgres);
        if(pkgres.data.error !== undefined){
          toast.error(pkgres.data.error.raw.message);
        }else{
          if(pkgres.data.status === 'error'){
            toast.error(pkgres.data.msg);
          }else{
            
            toast.success(pkgres.data.msg);
          }
          
        }
        

      }
      // Send the token to your server.
      // stripeTokenHandler(result.token);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="Stripe-form-row mb-3">
        <label>
          Credit or debit card
        </label>
        <CardElement
          id="card-element"
          options={CARD_ELEMENT_OPTIONS}
          onChange={handleChange}
        />
        <div className="card-errors" role="alert">{error}</div>
      </div>
      <button type="submit" className="btn btn-success">Submit Payment</button>
    </form>
  );
}
export default class BuyerViewPkgs extends Component {
  state = {
    Pkgs: [],
    showStripe : false,
    showPrevCards : false,
    showPlaceOrderBtn : false,
    selectedPkg : {},
    userPayment : [],
    payment_method_id : '',
    stripe_cust_id : '',
    myPkg : {}
};



async componentDidMount() {
  this.getAllPkgs();
  this.getMyPkgs();
  const {data : userPaymentMethods } = await getUser();
  this.setState ({
    userPayment : userPaymentMethods.paymentMethods,
    stripe_cust_id : userPaymentMethods.stripe_cus_id
  });
}
async getAllPkgs(){
  const { data } = await getPkgs();
  //console.log(data);
  this.setState({ Pkgs : data }); 
  
}

async getMyPkgs(){
  let userData = await getUser();
  this.setState({ myPkg : userData.data.packages[0] !== undefined ? userData.data.packages[0] : {} }); 
  //console.log(this.state.myPkg);
  
}
handleChoose(PkgDetail, index){
//console.log(PkgDetail);
//console.log(this.state.userPayment.length);
if(this.state.userPayment.length > 0){
  this.setState({ 
    showStripe : false,
    showPrevCards : true,
    selectedPkg : PkgDetail
  });
}else{
  this.setState({ 
    showStripe : true,
    selectedPkg : PkgDetail
  });
}

}

showStripeForm(){
  this.setState({ 
    showPrevCards : false,
    showStripe : true
  });
}
canelOrder(){
  this.setState({ 
    showPrevCards : false,
    showStripe : false,
    showPlaceOrderBtn : false
  });
}

selectedPaymentMethod(paymentDetail){
  //console.log(paymentDetail);
  this.setState({
    payment_method_id : paymentDetail,
    showPlaceOrderBtn : true,
    showPrevCards : false
  });
}

async placeOrderByPrevCard() {

  toast.warn('Working on your request!');
  const user = await auth.getCurrentUser();
  let pkgInfo = {
    user_id: user._id,
    pkgId: this.state.selectedPkg._id,
    bids: this.state.selectedPkg.bids,
    price : this.state.selectedPkg.price,
    payment_method:this.state.payment_method_id,
    customer_id : this.state.stripe_cust_id,
    type : 'old'
  }
  //console.log(pkgInfo);
  let pkgres = await pkgPurchaseByUser(pkgInfo);
    //console.log(pkgres);
    if(pkgres.data.error !== undefined){
      toast.error(pkgres.data.error.raw.message);
    }else{
      if(pkgres.data.status === 'error'){
        toast.error(pkgres.data.msg);
      }else{
        toast.success(pkgres.data.msg);
        this.setState({
          showPlaceOrderBtn : false
        })
      }
      
    }
}

async deletePaymentMethod(method_id){
  //console.log(method_id);
  let del = await deletePaymentMethodById(method_id);
  if(del.data.error !== undefined){
    toast.error(del.data.error.raw.message);
  }else{
    if(del.data.status === 'error'){
      toast.error(del.data.msg);
    }else{
      toast.success(del.data.msg);
      this.setState({
        showPrevCards : false
      });
    }
    
  }
}
//  renderTableDataPkgs() {
//     const { Pkgs } = this.state;
//     return Pkgs.map((PkgDetail,index) =>{
//         return (
//           <tr key={index}>
//              <td>{index+1}</td>
//              <td>{PkgDetail.bids}</td>
//              <td>{PkgDetail.price}</td>
//              <td> 
//                 <Button variant="success" type="button" onClick={() => this.handleChoose(PkgDetail, index)} className="UpdateButton">
//                     Choose
//                 </Button>
//             </td>
//           </tr>            
//        )
//     })
//  }

renderPaymentMethods(){
  const { userPayment } = this.state;
  return userPayment.map((paymentDetail, index) => {
    return (
      <li className="list-group-item" key={index}>
          <div className="float-left" onClick={() => this.selectedPaymentMethod(paymentDetail.paymentMethodId)}>
            <span className="paymetspan4 paymetspan">{paymentDetail.brand}</span>
            <span className="paymetspan1 paymetspan">************{paymentDetail.last4}</span>
            <span className="paymetspan2 paymetspan">{paymentDetail.exp_month}/</span>
            <span className="paymetspan3 paymetspan">{paymentDetail.exp_year}</span>
          </div>
          <i class="far fa-trash-alt float-right mt-1" onClick={() => this.deletePaymentMethod(paymentDetail.paymentMethodId)}></i>
      </li>
    );
  })
}

renderTableDataPkgs() {
  const { Pkgs } = this.state;
  return Pkgs.map((PkgDetail,index) =>{
      return (
          <div key={index} className="col-xl-3 col-lg-3 col-md-4 col-sm-8 col-xs-12">
            <div className="card my-2">
              <div className="card-body colorcards1">
                <h1>Package {index+1}</h1>
                <p className="card-text">
                  <b>No. of Bids : </b>{PkgDetail.bids}
                </p>
                <p className="card-text">
                  <b>Price : </b> Rs.{PkgDetail.price}/-
                </p>
                <Button variant="success" type="button" onClick={() => this.handleChoose(PkgDetail, index)} className="UpdateButton">
                    Choose
                </Button>
              </div>
            </div>
          </div>
     )
  })
}


render() {
    return (
        <div className="container-fluid">
            
              <div className='row mr-auto'>
              { this.state.myPkg &&
              <div className="col-12">
              <h3>My Package</h3>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Remaining Bids</th>
                    <th>Package Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{this.state.myPkg.bids}</td>
                    <td>{this.state.myPkg.price}</td>
                  </tr>
                </tbody>
              </table>
                </div>
            }
                <div className="col-12">
                    <div>
                        <h3>Packages</h3>
                        <div className="">
                            {/* <table  className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Sr#</th>
                                        <th>No. of Bids</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderTableDataPkgs()}
                                </tbody>
                            </table> */}
                            <div className="row">
                            {this.renderTableDataPkgs()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {this.state.showPrevCards ?
              <div class="row paymentMethodRow card w-50 m-auto p-3">
              <h2 class="col-12">Please Select Payment Method</h2>
              <ul class="list-group list-group-flush">
                {this.renderPaymentMethods()}
              </ul>
              <Button variant="info" type="button" onClick={() => this.showStripeForm()}>New Card</Button>
            </div>
            : null}

            {this.state.showPlaceOrderBtn ?
              <div class="row paymentMethodRow card w-50 m-auto p-3">
              <h2 class="col-12">Would you Like To place Order</h2>
              <div class="row">
              <div class="col-12 col-sm-6">
                <Button variant="info" type="button" onClick={() => this.canelOrder()}>Cancel</Button>
              </div>
              <div class="col-12 col-sm-6">
                <Button variant="info" type="button" onClick={() => this.placeOrderByPrevCard()}>Place Order</Button>
              </div>
              </div>
              
            </div>
            : null} 

            { this.state.showStripe ? 
              <div class="row card w-50 m-auto p-3">
                <div class="col-12">
                    <Elements stripe={stripePromise}>
                      <CheckoutForm selectedPkg={this.state.selectedPkg} />
                    </Elements>
                </div>
              </div>
            : null }
            
        </div>
    )
}

}
