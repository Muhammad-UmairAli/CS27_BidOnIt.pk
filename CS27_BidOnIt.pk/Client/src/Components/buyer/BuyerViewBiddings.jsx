import React, { Component } from 'react';
import Product from '../common/product';
import { liveproductsByUser } from '../../Services/productService';
export default class BuyerViewBiddings extends Component {
  state = {
    products : []
  };

  async componentDidMount() {
      const { data: products } = await liveproductsByUser();
      this.setState({ products });
  }

  render() {
    const prods = this.state.products;
    return (
      <div className="container-fluid">
                <div className='row mr-auto'>
                    <div className="col-12">
                        <div>
                            <h3>View Biddings</h3>
                            { prods.length > 0 && 
                              <Product products={prods} />
                            }
                        </div>
                    </div>
                </div>
            </div>
    );
  }
}
