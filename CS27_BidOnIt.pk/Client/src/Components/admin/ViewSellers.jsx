import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
//import {Sellers} from './data.js'
import { getSellers, changeUserStatus } from '../../Services/userService'
import { imageUrl } from '../../config.json';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
import 'datatables.net-bs/js/dataTables.bootstrap.js';
import $ from 'jquery';
const apiEndpoint = imageUrl;
export default class ViewSellers extends Component {
    state = {
        Sellers: []
    };
    async componentDidMount() {
        const { data } = await getSellers();
        //console.log(data);
        this.setState({ Sellers : data }, function(){
            $('#sellertable').DataTable({
                "dom": '<"top"lf>t<"bottom"p><"clear">',
                responsive: true,
                "bSort" : false,
            });
        }); 
    }

    async changeUserStatus(SellersDetail, index){
        //console.log(SellersDetail);
        let sellers = this.state.Sellers;
        let form = SellersDetail;
        form.status = form.status === undefined || form.status === 0 ? 1 : 0;
        const { data } = await changeUserStatus(form._id, form);
        sellers[index].status = data.status;
        //console.log(data);
        this.setState({ Sellers : sellers }); 
    }
     renderTableDataSellers() {
        const { Sellers } = this.state;
        return Sellers.map((SellersDetail,index) =>{
            return (
              <tr key={index}>
                 <td>{index+1}</td>
                 <td>{SellersDetail.name}</td>
                 <td>{SellersDetail.number}</td>
                 <td>{SellersDetail.email}</td>
                 <td><img width="70" height="70" alt="..." src={apiEndpoint+SellersDetail.userImage}/></td>
                 <td> 
                    <Button variant="danger" type="button" onClick={() => this.changeUserStatus(SellersDetail, index)} className="UpdateButton">
                        {(SellersDetail.status === undefined || SellersDetail.status === 0) ? 'Block' : 'Un-Block'}
                    </Button>
                </td>
              </tr>            
           )
        })
     }
    render() {
        return (
            <div className="container-fluid">
                <div className='row mr-auto'>
                    <div className="col-12">
                        <div>
                            <h3>Seller Data</h3>
                            <div className="table-responsive portlet">
                                <table  className="table" id="sellertable">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Sr#</th>
                                            <th>Name</th>
                                            <th>Phone Number</th>
                                            <th>Email</th>
                                            <th>Image</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderTableDataSellers()}
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
