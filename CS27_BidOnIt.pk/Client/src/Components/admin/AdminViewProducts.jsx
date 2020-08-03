import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { getCatagories } from '../../Services/catagoryService';
import { getProducts, getMySellerProducts, getMyProducts, getProductsByfilter, deleteProduct, approveProduct } from '../../Services/productService';
import ProductsTable from '../productsTable';
import SellerProductsTable from '../sellerProductTable';
import AdminProductsTable from '../AdminProductTable';
export default class AdminViewProducts extends Component {
  state = {
    type : this.props.match.params.type !== undefined ? this.props.match.params.type : "",
    products: [],
    catagories: [],
    dlt: false,
    view : 'all'
  };

  async componentDidMount() {
    this.getAllProducts();
  }

  async myProduct(){
    const { data: products } = await getMyProducts();
    this.setState({ products, dlt: true, view : 'admin' });
  }

  async sellerProduct(){
    const { data: products } = await getMySellerProducts();
    this.setState({ products, dlt: true, view : 'seller' });
  }

  async getAllProducts(){
    //console.log(this.state.type);
    const { data } = await getCatagories();
    const catagories = [{ _id: '', name: 'All Catagories' }, ...data];
    let type = this.state.type;
    if(type !== ""){
      const { data: products } = await getProductsByfilter(type);
      this.setState({ products, catagories, dlt: false, view : 'all' });
    }else{
      const { data: products } = await getProducts();
      this.setState({ products, catagories, dlt: true, view : 'all' });
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

  handleApprove = async product => {
    const originalProducts = this.state.products;
    const products = originalProducts;
    product.active_status = 1;
    this.setState({ products });

    try {
      await approveProduct(product);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) //console.log('x');
      toast.error('This Product has already been Approved.');

      this.setState({ products: originalProducts });
    }
  };

  render() {
    const { products } = this.state;
    return (
      <div className="container">
        <span className="display-4 mb-3">View Products</span>
        {this.state.type === "" && <div className="mb-3">
          <button onClick={(e) => {this.getAllProducts()}}>All Products</button>
          <button onClick={(e) => {this.myProduct()}}>My Products</button>
          <button onClick={(e) => {this.sellerProduct()}}>Seller's Products</button>
        </div>}
        {
          this.state.view === "all" && 
          <ProductsTable products={products} onDelete={this.handleDelete} onApprove={this.handleApprove} dlt={this.state.dlt} />
        }
        {
          this.state.view === "seller" && 
          <SellerProductsTable products={products} onDelete={this.handleDelete} onApprove={this.handleApprove} dlt={this.state.dlt} />
        }
        {
          this.state.view === "admin" && 
          <AdminProductsTable products={products} onDelete={this.handleDelete} onApprove={this.handleApprove} dlt={this.state.dlt} />
        }
      </div>
    );
  }
}
