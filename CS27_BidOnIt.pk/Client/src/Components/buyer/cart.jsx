import React, { Component, useState } from 'react';
import { toast } from 'react-toastify';
import { getOrders, orderPurchaseByUser } from '../../Services/orderService';
import { deletePaymentMethodById } from '../../Services/commonService';
import {Button} from 'react-bootstrap';
import auth from '../../Services/authService';
import { getUser } from '../../Services/userService';
import { loadStripe } from '@stripe/stripe-js';
import { imageUrl } from '../../config.json';
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
import 'datatables.net-bs/js/dataTables.bootstrap.js';
import $ from 'jquery';

const apiEndpoint = imageUrl;
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

const CheckoutForm = (state) => {
  
  let {Orders} = state.stateData;
  let total_price = state.stateData.total_price;
  let stripe_cust_id = state.stateData.stripe_cust_id;
  //console.log(Orders, total_price);
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
    // const form = event.target
    // const data = 
    const billing_address = document.querySelector('input[name="billing_address"]').value;
   
    const card = elements.getElement(CardElement);
    //console.log("card ", card);
    const result = await stripe.createToken(card)
    if (result.error) {
      // Inform the user if there was an error.
      setError(result.error.message);
    } else {
      setError(null);
      //console.log(result.token);
      const { paymentMethod, paymentMethodError } = await stripe.createPaymentMethod({
        type: 'card',
        card: card,
      });
      if(paymentMethodError){
        setError(paymentMethodError);
      }else{
        //console.log("Payment Method",paymentMethod);
        let orderInfo = {
          user_id: user._id,
          orders : Orders,
          price : total_price,
          payment_method:paymentMethod,
          customer_id : stripe_cust_id,
          billing_address : billing_address,
          type : 'new'
        }
        //console.log(orderInfo);
        let orderres = await orderPurchaseByUser(orderInfo);
        //console.log(orderres);
        if(orderres.data.error !== undefined){
          toast.error(orderres.data.error.raw.message);
        }else{
          if(orderres.data.status === 'error'){
            toast.error(orderres.data.msg);
          }else{
            toast.success(orderres.data.msg);
            setTimeout(() => {
              window.location.href = "/buyer/orders";  
            }, 1000);
            
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
        
        <div class="form-group">
          <label class="mb-3">Address</label>
        <input type="text" class="form-control" name="billing_address" onChange={handleChange} placeholder="Please Enter Your Complete Address"/>
        </div>
        <label class="mb-3">
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
export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Orders: [],
      showStripe : false,
      showPrevCards : false,
      selectedOrder : {},
      selectedIndex : '',
      userPayment : [],
      showAddressForm : false,
      payment_method_id : '',
      stripe_cust_id : '',
      address : ''
    };
    this.handleSubmitwithPrevCard = this.handleSubmitwithPrevCard.bind(this);
    this.handleAddressFormChange = this.handleAddressFormChange.bind(this);
  }
  




async componentDidMount() {
  this.getAllOrders();
  const {data : userPaymentMethods } = await getUser();
  //console.log(userPaymentMethods);
  this.setState ({
    userPayment : userPaymentMethods.paymentMethods,
    stripe_cust_id : userPaymentMethods.stripe_cus_id
  }, function(){
    $('#carttable').DataTable({
      "dom": '<"top"lf>t<"bottom"p><"clear">',
      responsive: true,
      "bSort" : false,
    });
}
);
  
}

async getAllOrders(){
  const { data } = await getOrders();
  //console.log(data);
  this.setState({ Orders : data }); 
  
}

handleChoose(OrderDetail, index){
  //console.log(OrderDetail);
  this.setState({ 
    showStripe : true,
    selectedOrder : OrderDetail
  });
}

handleChooseAll(total_price){
  this.setState({ 
    showPrevCards : true,
    showStripe : false,
    showAddressForm : false,
    total_price : total_price
  });
}
showStripeForm(){
  this.setState({ 
    showPrevCards : false,
    showStripe : true
  });
}

selectedPaymentMethod(paymentDetail){
  //console.log(paymentDetail);
  this.setState({
    payment_method_id : paymentDetail,
    showAddressForm : true,
    showPrevCards : false
  });
}

async handleSubmitwithPrevCard(event) {
  // alert('A name was submitted: ' + this.state.address);
  event.preventDefault();
  toast.warn('Working on your request!');
  const user = await auth.getCurrentUser();
  let orderInfo = {
    user_id: user._id,
    orders : this.state.Orders,
    price : this.state.total_price,
    payment_method:this.state.payment_method_id,
    customer_id : this.state.stripe_cust_id,
    billing_address : this.state.address,
    type : 'old'
  }
  //console.log(orderInfo);
  let orderres = await orderPurchaseByUser(orderInfo);
    //console.log(orderres);
    if(orderres.data.error !== undefined){
      toast.error(orderres.data.error.raw.message);
    }else{
      if(orderres.data.status === 'error'){
        toast.error(orderres.data.msg);
      }else{
        toast.success(orderres.data.msg);
        setTimeout(() => {
          window.location.href = "/buyer/orders";  
        }, 1000);
      }
      
    }
}

handleAddressFormChange(event) {
  this.setState({address: event.target.value});
}

async deletePaymentMethod(method_id){
  //console.log(method_id);
  toast.warn('Working on your request!');
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

total_price = 0;
 renderTableDataOrders() {
    const { Orders } = this.state;
    this.total_price = 0;
    return Orders.map((OrderDetail,index) =>{
      this.total_price = this.total_price + OrderDetail.bidAmount;
        return (
          <tr key={index}>
             <td>{index+1}</td>
             <td><img width="150" alt=".." src={apiEndpoint+OrderDetail.product_image} /></td>
             <td>{OrderDetail.title}</td>
             <td>Rs.{OrderDetail.original_price}/-</td>
             <td>Rs.{OrderDetail.bidAmount}/-</td>
             <td>{OrderDetail.payment_status}</td>
          </tr>            
       )
       
    })
    
 }
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

render() {
    const { Orders } = this.state;
    return (
        <div className="container-fluid">
            <div className='row mr-auto'>
                <div className="col-12">
                <h3>Orders</h3>
                    <div className="row">
                        <div className="col-md-12">
                            <table id="carttable" className="table table-bordered">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Sr#</th>
                                        <th>Product Image</th>
                                        <th>Product Name</th>
                                        <th>Original Price</th>
                                        <th>Bid Price</th>
                                        <th>Payment Status</th>
                                        {/* <th>Action</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderTableDataOrders()}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-12">
                          <div className="float-right">
                            <span className="font-weight-bold">Total Price : Rs.{this.total_price}/-</span>
                            {Orders.length > 0 &&
                              <Button variant="success" type="button" onClick={() => this.handleChooseAll(this.total_price)} className="UpdateButton">
                                  CheckOut
                            </Button>
                            }
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

            {this.state.showAddressForm ? 
              <div class="row card w-50 m-auto p-3">
                <div class="col-12 mb-2">
                  <h2>Please Enter Your Address</h2>
                </div>
                <div class="col-12">
                  <form onSubmit={this.handleSubmitwithPrevCard}>
                    <div class="form-group">
                    <input type="text" class="form-control" value={this.state.address} onChange={this.handleAddressFormChange} placeholder="Please Enter Your Complete Address"/>
                    </div>
                    <div class="form-group text-center">
                      <Button variant="success" type="submit">Place Order</Button>
                    </div>
                  </form>
                </div>
              </div>
            : null}
            
            
            { this.state.showStripe ? 
              <div class="row card w-50 m-auto p-3">
                <div class="col-12">
                    <Elements stripe={stripePromise}>
                      <CheckoutForm stateData={this.state} />
                    </Elements>
                </div>
              </div>
            : null }
            
        </div>
    )
}

}
// POST the token ID to your backend.

