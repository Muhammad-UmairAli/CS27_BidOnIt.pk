import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getProduct, saveProduct } from '../Services/productService';
import { getCatagories } from '../Services/catagoryService';

export default class productForm extends Form {
  state = {
    data: {
      title: '',
      catagoryId: '',
      description: '',
      timer: '',
      price: '',
      imageUrl: ''
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
      .max(100)
      .label('Timer'),
    price: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label('Price'),

    description: Joi.string()
      .required()
      .label('Description'),
    imageUrl: Joi.string()
      .required()
      .label('ImageUrl')
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
      this.setState({ data: this.mapToViewModel(product) });
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
    return {
      _id: product._id,
      title: product.title,
      catagoryId: product.catagory._id,
      description: product.description,
      timer: product.timer,
      price: product.price,
      imageUrl: product.imageUrl
    };
  }

  doSubmit = async () => {
    await saveProduct(this.state.data);

    this.props.history.push('/seller/dashboard');
  };

  render() {
    return (
      <div>
        <h1>Add Product</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('catagoryId', 'Catagory', this.state.catagories)}
          {this.renderInput('description', 'Description')}
          {this.renderInput('timer', 'Timer', 'number')}
          {this.renderInput('price', 'Price', 'number')}
          {this.renderInput('imageUrl', 'ImageUrl')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}
