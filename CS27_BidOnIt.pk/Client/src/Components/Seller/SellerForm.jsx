import React from 'react';
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import "react-datepicker/dist/react-datepicker.css";
import Joi from 'joi-browser';
import Form from '../common/form';
import { getProduct, saveProduct } from '../../Services/productService';
import { getCatagories } from '../../Services/catagoryService';
import { getCurrentUser } from '../../Services/authService';
export default class SellerForm extends Form {
  user = getCurrentUser();
  state = {
    data: {
      title: '',
      catagoryId: '',
      description: '',
      timer: '',
      scheduleChk : 0,
      schedule: new Date(new Date().getTime()),
      price: '',
      imageUrl: '',
      imagePath : 'new',
      otherImagesPath : [],
      added_by : this.user._id,
      active_status : this.user.type === 'admin' ? 1 : 0,
      status : 'Un-Sold'
    },
    catagories: [],
    errors: {}
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label('Title'),
    catagoryId: Joi.string()
      .required()
      .label('Catagory'),
    timer: Joi.number()
      .required()
      .min(0)
      .label('Timer'),
    scheduleChk: Joi.number()
      .label('scheduleChk'),
    schedule: Joi.object()
      .required()
      .label('schedule'),
    price: Joi.number()
      .required()
      .min(0)
      .label('Price'),

    description: Joi.string()
      .required()
      .label('Description'),
    imageUrl: Joi.object()
      .required()
        .label('ImageUrl'),
    imagePath: Joi.string()
      .label('ImagePath'),
    otherImagesPath: Joi.array()
      .label('otherImagesPath'),
    added_by: Joi.string()
      .label('added_by'),
    active_status: Joi.number()
      .label('active_status'),
      status: Joi.string()
      .label('status'),  
  };

  async populateCatagories() {
    const { data: catagories } = await getCatagories();
    this.setState({ catagories });
  }

  async populateProduct() {
    try {
      const productId = this.props.match.params.id;
      if (productId === 'new') return;

      const { data: product } = await getProduct(productId);
      this.setState({ data: this.mapToViewModel(product) }, function(){
        console.log(this.state.data);
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    await this.populateCatagories();
    await this.populateProduct();
  }

  mapToViewModel(product) {
    this.setState({
      scheduleChkTime: product.scheduleChk,
      scheduleTime : new Date(product.schedule),
    })
    return {
      _id: product._id,
      title: product.title,
      catagoryId: product.catagory._id,
      description: product.description,
      timer: product.timer,
      scheduleChk: product.scheduleChk,
      schedule: product.scheduleChk === 0 ? new Date(new Date().getTime()) :  new Date(new Date().getTime() + 5*60000),
      price: product.price,
      imageUrl: {},
      imagePath: product.imageUrl,
      otherImagesPath: product.otherImages,
      added_by : product.added_by,
      active_status : product.active_status,
      status : product.status
    };
  }

  doSubmit = async () => {
    await saveProduct(this.state.data);

    this.props.history.push('/seller/dashboard');
  };

  handleChangeDate = date => {
    let { data } = this.state;
    data.schedule = date;
    this.setState({
      data : data
    }, function(){
      console.log(this.state.data);
    });
  };

  handleChangeChk(e){
    let { data } = this.state;
    data.scheduleChk = data.scheduleChk === 0 ? 1 : 0;
    if(data.scheduleChk === 1){
      data.schedule = new Date(new Date().getTime() + 5*60000);
    }else{
      data.schedule = new Date(new Date().getTime());
    }
    this.setState({
      data : data
    }, function(){
      console.log(this.state.data);
    });
  }

  render() {
    const ExampleCustomInput = ({ value, onClick }) => (
      <button type="button" className="btn btn-primary" style={{'width' : '100px'}} onClick={onClick}>
        {value}
      </button>
    );
    return (
      <div>
        <h1>Add Product</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('catagoryId', 'Catagory', this.state.catagories)}
          {this.renderInput('description', 'Description')}
          {this.renderInput('timer', 'Timer', 'number')}
          <div class="form-group">
            <label htmlFor="scheduleChk">Schedule</label>
            <input type="checkbox" onChange={(e) => {this.handleChangeChk(e)}} checked={this.state.data.scheduleChk === 1 ? true : false } />
          </div>
          {this.state.data.scheduleChk === 1 &&
            <div class="form-group">
              {this.state.scheduleTime && this.state.scheduleChkTime === 1 && <div><label style={{'width': '15.6%'}}>Scheduled at <input className="form-control" disabled value={this.state.scheduleTime} /></label><br></br></div> } 
            <label htmlFor="schedule">Schedule Time</label>
            <DatePicker
              className="form-control"
              selected={this.state.data.schedule}
              onChange={this.handleChangeDate}
              showTimeSelect
              showTimeSelectOnly
              minDate={new Date()}
              showDisabledMonthNavigation
              minTime={new Date().getTime() + 5*60000}
              maxTime={setHours(setMinutes(this.state.data.schedule, 55), 23)}
              customInput={<ExampleCustomInput />}
              //timeFormat="HH:mm"
              timeIntervals={5}
              timeCaption="Time"
              //dateFormat="MMMM d, yyyy h:mm aa"  
              dateFormat="h:mm aa"              
            />
          </div>}
          {this.renderInput('price', 'Price', 'number')}
          {/* {this.renderInput('imageUrl', 'ImageUrl')} */}
          {this.renderFileInput('imageUrl', 'ImageUrl', 'file', "image/*")}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}
