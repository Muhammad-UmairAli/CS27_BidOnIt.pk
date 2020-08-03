import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { getCatagories } from '../../Services/catagoryService';
import { getSellerProducts, getProductsByfilter, deleteProduct } from '../../Services/productService';
import ProductsTable from '../productsTable';

export default class SellerViewProducts extends Component {
  state = {
    products: [],
    catagories: [],
    type : this.props.match.params.type !== undefined ? this.props.match.params.type : "",
    dlt: false
  };

  async componentDidMount() {
    //console.log(this.state.type);
    const { data } = await getCatagories();
    const catagories = [{ _id: '', name: 'All Catagories' }, ...data];
    let type = this.state.type;
    if(type !== ""){
      const { data: products } = await getProductsByfilter(type);
      this.setState({ products, catagories });
    }else{
      const { data: products } = await getSellerProducts();
    this.setState({ products, catagories, dlt: true });
    }

    
  }

  handleDelete = async product => {
    const originalProducts = this.state.products;
    const products = originalProducts.filter(m => m._id !== product._id);
    this.setState({ products });

    try {
      await deleteProduct(product._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) //console.log('x');
      toast.error('This Product has already been deleted.');

      this.setState({ products: originalProducts });
    }
  };

  render() {
    const { products } = this.state;
    return (
      <div className="container">
        <span className="display-4 mb-3">View Products</span>
        <div className="table-responsive">
        <ProductsTable products={products} onDelete={this.handleDelete} dlt={this.state.dlt} />
        </div>
      </div>
    );
  }
}
