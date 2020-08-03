import React, { Component } from 'react'
// import {Users} from './data.js'
import { getUserPacks} from '../../Services/userService'
import 'datatables.net-bs/css/dataTables.bootstrap.css';
import 'datatables.net-bs/js/dataTables.bootstrap.js';
import $ from 'jquery';

export default class ViewUserPacks extends Component {
    state = {
        Users: []
    };
    
    async componentDidMount() {
        const { data } = await getUserPacks();
        //console.log(data);
        this.setState({ Users : data }, function(){
            $('#userpkgtable').DataTable({
                "dom": '<"top"lf>t<"bottom"p><"clear">',
                responsive: true,
                "bSort" : false,
            });
        }
); 
    }
    
    renderTableDataUsers() {
        const { Users } = this.state;
        return Users.map((UsersDetail,index) =>{
            return (
              <tr key={index}>
                 <td>{index+1}</td>
                 <td>{UsersDetail.name}</td>
                 <td>Package 1</td>
                 <td>{UsersDetail.packages[0].bids}</td>
                 <td>{UsersDetail.packages[0].price}</td>
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
                            <h3>Users Packages Data</h3>
                            <div className="table-responsive portlet">
                                <table  className="table" id="userpkgtable">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Sr#</th>
                                            <th>Name</th>
                                            <th>Package Name</th>
                                            <th>Package Bids (Left)</th>
                                            <th>Package Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.Users && this.renderTableDataUsers()}
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
