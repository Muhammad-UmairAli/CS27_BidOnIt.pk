import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
// import {Users} from './data.js'
import { getUsers, changeUserStatus } from '../../Services/userService'
import { imageUrl } from '../../config.json'
import 'datatables.net-bs/css/dataTables.bootstrap.css';
import 'datatables.net-bs/js/dataTables.bootstrap.js';
import $ from 'jquery';
const apiEndpoint = imageUrl;

export default class ViewUsers extends Component {
    state = {
        Users: []
    };
    
    async componentDidMount() {
        const { data } = await getUsers();
        //console.log(data);
        this.setState({ Users : data }, function(){
            $('#usertable').DataTable({
                "dom": '<"top"lf>t<"bottom"p><"clear">',
                responsive: true,
                "bSort" : false,
            });
        }); 
    }

    async changeUserStatus(UsersDetail, index){
        //console.log(UsersDetail);
        let users = this.state.Users;
        let form = UsersDetail;
        form.status = form.status === undefined || form.status === 0 ? 1 : 0;
        const { data } = await changeUserStatus(form._id, form);
        users[index].status = data.status;
        //console.log(data);
        this.setState({ Users : users }); 
    }
    
    renderTableDataUsers() {
        const { Users } = this.state;
        return Users.map((UsersDetail,index) =>{
            return (
              <tr key={index}>
                 <td>{index+1}</td>
                 <td>{UsersDetail.name}</td>
                 <td>{UsersDetail.number}</td>
                 <td>{UsersDetail.email}</td>
                 <td><img width="70" height="70" alt="..." src={apiEndpoint+UsersDetail.userImage}/></td>
                 <td> 
                    <Button variant="danger" type="button" onClick={() => this.changeUserStatus(UsersDetail, index)} className="UpdateButton">
                        {(UsersDetail.status === undefined || UsersDetail.status === 0) ? 'Block' : 'Un-Block'}
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
                            <h3>Users Data</h3>
                            <div className="table-responsive portlet">
                                <table  className="table" id="usertable">
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
