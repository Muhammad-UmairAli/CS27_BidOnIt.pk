import React, { Component } from 'react';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import Product from './common/product';
import { getActiveProducts } from '../Services/productService';
import { getCatagories } from '../Services/catagoryService';
import { paginate } from '../utils/paginate';
import SearchBox from '../Components/common/searchBox';
import '../Css/products.css';

export default class Products extends Component {
  state = {
    products: [],
    catagories: [],
    currentPage: 1,
    searchQuery: '',
    selectedCatagory: null,
    pageSize: 8
  };

  async componentDidMount() {
    const { data } = await getCatagories();
    const catagories = [{ _id: '', name: 'All Catagories' }, ...data];

    const { data: products } = await getActiveProducts();

    this.setState({ products, catagories });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleCatagorySelect = catagory => {
    this.setState({ selectedCatagory: catagory, currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedCatagory: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedCatagory,
      searchQuery,
      products: allProducts
    } = this.state;

    let filtered = allProducts;
    if (searchQuery)
      filtered = allProducts.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedCatagory && selectedCatagory._id)
      filtered = allProducts.filter(
        m => m.catagory._id === selectedCatagory._id
      );

    const products = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, data: products };
  };
  render() {
    const { pageSize, currentPage, searchQuery } = this.state;
    const { totalCount, data: prods } = this.getPagedData();
    ////console.log(prods);
    return (
      <React.Fragment>
        <div className="container-flex">
          <div className="col-lg-12 Auction-title">
            <nav className=" navbar">
              <i className="h2">Live Auctions</i>
              <form className="form-inline">
                <SearchBox value={searchQuery} onChange={this.handleSearch} />
              </form>
            </nav>
          </div>
          <div className="row responsive-row">
            <div className="col-lg-2 col-md-3 col-sm-4 col-xm-2">
              <ListGroup
                items={this.state.catagories}
                selectedItem={this.state.selectedCatagory}
                onItemSelect={this.handleCatagorySelect}
              />
            </div>
            <div className="col-lg-10 col-md-9 col-sm-8 col-xm-10">
              { prods.length > 0 && 
                <Product products={prods} />
              }
              
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
