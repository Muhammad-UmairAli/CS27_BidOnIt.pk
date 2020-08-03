import React, { Component } from 'react';
import { getBiddingsByfilter } from '../../Services/productService';
import { imageUrl } from '../../config.json';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
import 'datatables.net-bs/js/dataTables.bootstrap.js';
import $ from 'jquery';
const apiEndpoint = imageUrl;
export default class AdminViewBiddings extends Component {
  state = {
    type : this.props.match.params.type !== undefined ? this.props.match.params.type : "",
    biddings: [],
    catagories: []
  };

  renderTableDataBiddings() {
    const { biddings } = this.state;
    return biddings.map((biddingsDetail,index) =>{
        return (
          <tr key={index}>
             <td>{index+1}</td>
             <td><img width="70" alt=".." src={apiEndpoint+biddingsDetail.product_image} /></td>
             <td>{biddingsDetail.title}</td>
             <td>Rs.{biddingsDetail.original_price}/-</td>
             <td>Rs.{biddingsDetail.bidAmount}/-</td>
             <td>{biddingsDetail.bidByName}</td>
          </tr>            
       )
    })
}

  async componentDidMount() {
    //console.log(this.state.type);
    let type = this.state.type;
    if(type !== ""){
      const { data: biddings } = await getBiddingsByfilter(type);
      this.setState({ biddings }, function(){
        $('#bidstable').DataTable({
          "dom": '<"top"lf>t<"bottom"p><"clear">',
          responsive: true,
          "bSort" : false,
          // "aaSorting" : [[]]
        });
    }
);
    }
  }

  render() {
    return (
      <div className="container-fluid">
                <div className='row mr-auto'>
                    <div className="col-12">
                        <div>
                            <h3>View Biddings</h3>
                            <div className="table-responsive portlet">
                                <table  className="table" id="bidstable">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Sr#</th>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Original Price</th>
                                            <th>Bid Amount</th>
                                            <th>Bid By</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.biddings && this.renderTableDataBiddings()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
  }
}
