import React, { Component} from 'react';
import { getCompletedOrdersById } from '../../Services/orderService';
import { imageUrl } from '../../config.json';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
import 'datatables.net-bs/js/dataTables.bootstrap.js';
import $ from 'jquery';
const apiEndpoint = imageUrl;

export default class Orders extends Component {
    state = {
        Orders: []
    };

    async componentDidMount() {
        this.getAllOrders();
    }

    async getAllOrders(){
        const { data } = await getCompletedOrdersById();
        this.setState({ Orders : data }, function(){
            $('#ordertable').DataTable({
                "dom": '<"top"lf>t<"bottom"p><"clear">',
                responsive: true,
                "bSort" : false,
            });
        });    
    }

    renderTableDataOrders() {
        const { Orders } = this.state;
        this.total_price = 0;
        return Orders.map((OrderDetail,index) =>{
            return (
              <tr key={index}>
                 <td>{index+1}</td>
                 <td><img width="150" alt="..." src={apiEndpoint+OrderDetail.product_image} /></td>
                 <td>{OrderDetail.title}</td>
                 <td>Rs.{OrderDetail.original_price}/-</td>
                 <td>Rs.{OrderDetail.bidAmount}/-</td>
                 <td>{OrderDetail.bidByName}</td>
                 <td>{OrderDetail.billing_address}</td>
                 <td>{OrderDetail.payment_status}</td>
              </tr>            
           )
           
        })
        
     }

     render() {
        return (
            <div className="container-fluid">
                <div className='row mr-auto'>
                    <div className="col-12">
                    <h3>Completed Orders</h3>
                        <div className="row">
                            <div className="col-md-12">
                                <table  className="table table-bordered"  id="ordertable">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Sr#</th>
                                            <th>Product Image</th>
                                            <th>Product Name</th>
                                            <th>Original Price</th>
                                            <th>Bid Price</th>
                                            <th>Bid By</th>
                                            <th>Address</th>
                                            <th>Payment Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderTableDataOrders()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}